from pydantic import BaseModel
from queries.pool import pool
from datetime import datetime
from fastapi import HTTPException


class EventsIn(BaseModel):
    name: str
    description: str
    location: str
    start_date: datetime
    end_date: datetime
    group_id: int


class EventsOut(BaseModel):
    id: int
    name: str
    description: str
    location: str
    start_date: datetime
    end_date: datetime
    group_id: int


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
