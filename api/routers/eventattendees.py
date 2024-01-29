from fastapi import APIRouter, Depends, HTTPException
from typing import List
from queries.eventattendees import (
    EventAttendeesRepository,
    EventAttendeesIn,
    EventAttendeesOut,
)

router = APIRouter()
event_attendees_repository = EventAttendeesRepository()


@router.post("/eventattendees", response_model=EventAttendeesOut)
def attend_event(
    attendance_data: EventAttendeesIn,
    repo: EventAttendeesRepository = Depends(),
):
    try:
        return repo.attend_event(attendance_data)
    except HTTPException as e:
        print(f"HTTPException: {e}")
        raise


@router.get(
    "/eventattendees/{event_id}", response_model=List[EventAttendeesOut]
)
def get_attendees(event_id: int, repo: EventAttendeesRepository = Depends()):
    try:
        return repo.get_attendees(event_id)
    except HTTPException as e:
        print(f"HTTPException: {e}")
        raise


@router.delete("/eventattendees", response_model=bool)
def leave_event(
    attendance_data: EventAttendeesIn,
    repo: EventAttendeesRepository = Depends(),
):
    try:
        return repo.leave_event(attendance_data)
    except HTTPException as e:
        print(f"HTTPException: {e}")
        raise
