from pydantic import BaseModel
from queries.pool import pool
from datetime import date
from fastapi import HTTPException
from typing import List


class AvailabilityIn(BaseModel):
    day: date
    is_match: bool
    user_id: int


class AvailabilityOut(BaseModel):
    id: int
    day: date
    is_match: bool
    user_id: int


class AvailabilityRepository:
    def create(
        self,
        availability: AvailabilityIn,
        user: dict,
    ) -> AvailabilityOut:
        if int(user["id"]) != availability.user_id:
            raise HTTPException(status_code=400, detail="Incorrect user id")
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            INSERT INTO availabilities
                                (day
                                , is_match
                                , user_id)
                            VALUES
                                (%s, %s, %s)
                            RETURNING id;
                            """,
                        [
                            availability.day,
                            availability.is_match,
                            availability.user_id,
                        ],
                    )
                    availability_id = result.fetchone()[0]
                    old_data = availability.dict()
                    return AvailabilityOut(**old_data, id=availability_id)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="Error creating availability"
            ) from e

    def get_user_availability(self, user_id: int) -> List[AvailabilityOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT a.id, a.day, a.is_match, a.user_id
                    FROM availabilities a
                    WHERE a.user_id = %s;
                    """,
                    [user_id],
                )
                rows = db.fetchall()
                result = []
                for row in rows:
                    availability_data = {
                        "id": row[0],
                        "day": row[1],
                        "is_match": row[2],
                        "user_id": row[3],
                    }
                    result.append(AvailabilityOut(**availability_data))
                return result

    def get_all_availabilities(self) -> List[AvailabilityOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT a.id, a.day, a.is_match, a.user_id
                    FROM availabilities a;
                    """
                )
                rows = db.fetchall()
                result = []
                for row in rows:
                    availability_data = {
                        "id": row[0],
                        "day": row[1],
                        "is_match": row[2],
                        "user_id": row[3],
                    }
                    result.append(AvailabilityOut(**availability_data))
        return result

    def get_availabilities_by_date(
        self, target_date: date
    ) -> List[AvailabilityOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT a.id, a.day, a.is_match, a.user_id
                    FROM availabilities a
                    WHERE a.day = %s;
                    """,
                    (target_date,),
                )
                rows = db.fetchall()
                result = []
                for row in rows:
                    availability_data = {
                        "id": row[0],
                        "day": row[1],
                        "is_match": row[2],
                        "user_id": row[3],
                    }
                    result.append(AvailabilityOut(**availability_data))
        return result

    def check_availability_exists(self, user_id: int, day: date) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT COUNT(*)
                    FROM availabilities
                    WHERE user_id = %s AND day = %s;
                    """,
                    (user_id, day),
                )
                count = db.fetchone()[0]
                return count > 0
