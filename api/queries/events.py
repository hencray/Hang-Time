from typing import List
from pydantic import BaseModel
from queries.pool import pool
from datetime import date
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class EventsIn(BaseModel):
    name: str
    description: str
    location: str
    start_date: date
    end_date: date
    group_id: int


class EventsOut(BaseModel):
    id: int
    name: str
    description: str
    location: str
    start_date: date
    end_date: date
    group_id: int
    group_name: str  # New field
    group_description: str  # New field


class UserGroupIn(BaseModel):
    user_id: int
    group_id: int


class UserGroupOut(BaseModel):
    group_id: int
    name: str
    description: str


class EventsRepository:
    def create(self, event: EventsIn) -> EventsOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            INSERT INTO events
                                (name
                                , description
                                , location
                                , start_date
                                , end_date
                                , group_id)
                            VALUES
                                (%s, %s, %s, %s, %s, %s)
                            RETURNING id;
                            """,
                        [
                            event.name,
                            event.description,
                            event.location,
                            event.start_date,
                            event.end_date,
                            event.group_id,
                        ],
                    )
                    event_id = result.fetchone()[0]
                    old_data = event.dict()
                    return EventsOut(**old_data, id=event_id)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="Error creating event"
            ) from e

    def delete(self, event_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s;
                        """,
                        [event_id],
                    )
                    return True
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="Error deleting event"
            ) from e

    def get_one(self, event_id: int) -> EventsOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM events
                        WHERE id = %s;
                        """,
                        [event_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        raise HTTPException(
                            status_code=404, detail="Event not found"
                        )
                    return EventsOut(
                        id=record[0],
                        name=record[1],
                        description=record[2],
                        location=record[3],
                        start_date=record[4],
                        end_date=record[5],
                        group_id=record[6],
                    )
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="Error getting event"
            ) from e

    def get_all(self) -> List[EventsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                            , name
                            , description
                            , location
                            , start_date
                            , end_date
                            , group_id
                        FROM events;
                        """
                    )
                    results = []
                    for record in db:
                        event = EventsOut(
                            id=record[0],
                            name=record[1],
                            description=record[2],
                            location=record[3],
                            start_date=(record[4]),
                            end_date=(record[5]),
                            group_id=record[6],
                        )
                        results.append(event)
                    return results
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="Error getting events"
            ) from e

    def user_groups_events(self, user_id: int) -> List[EventsOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT
                    au.id AS user_id,
                    au.First_Name,
                    au.Last_Name,
                    g.name AS group_name,
                    g.description AS group_description,
                    g.id AS group_id,
                    e.id AS event_id,
                    e.name AS event_name,
                    e.description AS event_description,
                    e.location,
                    e.start_date,
                    e.end_date
                    FROM authenticated_users au
                    JOIN usergroups ug ON au.id = ug.user_id
                    JOIN groups g ON ug.group_id = g.id
                    JOIN events e ON g.id = e.group_id
                    WHERE au.id = %s
                    ORDER BY e.start_date;
                    """,
                    [user_id],
                )

                events = db.fetchall()
                results = []
                for event in events:
                    result = EventsOut(
                        group_id=event[5],
                        group_name=event[3],
                        group_description=event[4],
                        id=event[6],
                        name=event[7],
                        description=event[8],
                        location=event[9],
                        start_date=event[10],
                        end_date=event[11],
                    )
                    results.append(result)
                return results
