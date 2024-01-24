from fastapi import APIRouter, Depends
from queries.events import EventsIn, EventsRepository

router = APIRouter()


@router.post("/events")
def create_event(event: EventsIn, events: EventsRepository = Depends()):
    return events.create(event)
