from typing import Union, List
from fastapi import APIRouter, Depends, HTTPException
from queries.events import (
    EventsIn,
    EventsOut,
    EventsRepository,
    Error,
    EventsWithGroupInfo,
)
from authenticator import authenticator

router = APIRouter()


@router.post("/events")
def create_event(
    event: EventsIn,
    events: EventsRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )

    return events.create(event)


@router.delete("/events/{event_id}")
def delete_event(
    event_id: int,
    events: EventsRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
) -> bool:
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    if not events.delete(event_id):
        raise HTTPException(status_code=404, detail="Event not found")
    return events.delete(event_id)


@router.get("/events", response_model=Union[List[EventsOut], Error])
def get_all(
    rep: EventsRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    return rep.get_all()


@router.get("/events/{event_id}", response_model=Union[EventsOut, Error])
def get_one(
    event_id: int,
    rep: EventsRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    return rep.get_one(event_id)


@router.get(
    "/users/{user_id}/events",
    response_model=Union[List[EventsWithGroupInfo], Error],
)
def get_user_events(
    user_id: int,
    rep: EventsRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    return rep.user_groups_events(user_id)


@router.put("/events/{event_id}")
def update_event(
    event_id: int,
    event: EventsIn,
    events: EventsRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    if not events.update(event_id, event):
        raise HTTPException(status_code=404, detail="Event not found")
    return events.update(event_id, event)
