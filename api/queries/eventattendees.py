from pydantic import BaseModel
from fastapi import HTTPException
from queries.pool import pool
from typing import List


class EventAttendeesIn(BaseModel):
    user_id: int
    event_id: int


class EventAttendeesOut(BaseModel):
    id: int
    user_id: int
    event_id: int
    first_name: str
    last_name: str


class EventAttendeesRepository:
    def attend_event(
        self, attendance_data: EventAttendeesIn
    ) -> EventAttendeesOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Check if the user is already attending the event
                    existing_attendance = db.execute(
                        """
                        SELECT e.id, e.user_id, e.event_id,
                               u.first_name, u.last_name
                        FROM eventattendees e
                        JOIN authenticated_users u ON e.user_id = u.id
                        WHERE e.user_id = %s AND e.event_id = %s;
                        """,
                        [attendance_data.user_id, attendance_data.event_id],
                    ).fetchone()

                    if existing_attendance:
                        raise HTTPException(
                            status_code=400,
                            detail="User is already attending the event.",
                        )

                    # Insert the new attendance record
                    result = db.execute(
                        """
                        INSERT INTO eventattendees (user_id, event_id)
                        VALUES (%s, %s)
                        RETURNING id;
                        """,
                        [attendance_data.user_id, attendance_data.event_id],
                    )
                    attendance_id = result.fetchone()[0]

                    # Retrieve user details
                    user_details = db.execute(
                        """
                        SELECT first_name, last_name
                        FROM authenticated_users
                        WHERE id = %s;
                        """,
                        [attendance_data.user_id],
                    ).fetchone()

                    return EventAttendeesOut(
                        id=attendance_id,
                        user_id=attendance_data.user_id,
                        event_id=attendance_data.event_id,
                        first_name=user_details[0],
                        last_name=user_details[1],
                    )

        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error attending event: {e}"
            )

    def get_attendees(self, event_id: int) -> List[EventAttendeesOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                            SELECT e.id, e.user_id, e.event_id,
                                   u.first_name, u.last_name
                            FROM eventattendees e
                            JOIN authenticated_users u ON e.user_id = u.id
                            WHERE e.event_id = %s;
                            """,
                        [event_id],
                    )
                    results = [
                        EventAttendeesOut(
                            id=row[0],
                            user_id=row[1],
                            event_id=row[2],
                            first_name=row[3],
                            last_name=row[4],
                        )
                        for row in db.fetchall()
                    ]
                    return results
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error getting event attendees: {e}"
            )

    def leave_event(self, attendance_data: EventAttendeesIn) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Check if the user is attending the event
                    existing_attendance = db.execute(
                        """
                        SELECT id
                        FROM eventattendees
                        WHERE user_id = %s AND event_id = %s;
                        """,
                        [attendance_data.user_id, attendance_data.event_id],
                    ).fetchone()

                    if not existing_attendance:
                        raise HTTPException(
                            status_code=400,
                            detail="User is not attending the event.",
                        )

                    # Remove the user from the attendees list
                    db.execute(
                        """
                        DELETE FROM eventattendees
                        WHERE user_id = %s AND event_id = %s;
                        """,
                        [attendance_data.user_id, attendance_data.event_id],
                    )

                    return True

        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error leaving event: {e}"
            )
