from fastapi import APIRouter, Depends, HTTPException
from authenticator import authenticator
from datetime import date
from typing import Optional
from queries.availability import (
    AvailabilityIn,
    AvailabilityOut,
    AvailabilityRepository,
)

router = APIRouter()


@router.post("/availability", response_model=AvailabilityOut)
def create_availability(
    availability: AvailabilityIn,
    repo: AvailabilityRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    if (
        int(account_data["id"]) != availability.user_id
    ):  # Convert account_data["id"] to int
        raise HTTPException(status_code=400, detail="Incorrect user id")

    if repo.check_availability_exists(availability.user_id, availability.day):
        raise HTTPException(
            status_code=400,
            detail="Availability already exists for this user on this date",
        )

    return repo.create(availability, account_data)


@router.get("/availability/{user_id}")
def get_user_availability(
    user_id: int,
    repo: AvailabilityRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    return repo.get_user_availability(user_id)


@router.get("/availability/")
def get_all_availabilities(
    repo: AvailabilityRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    return repo.get_all_availabilities()


@router.get("/availabilities")
def get_availabilities_by_date(
    date: Optional[date] = None,
    repo: AvailabilityRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    if not date:
        raise HTTPException(status_code=400, detail="Missing date parameter")
    availabilities = repo.get_availabilities_by_date(date)
    return {
        "availabilities": [
            availability.dict() for availability in availabilities
        ]
    }


@router.delete("/availability/past")
def delete_past_availabilities(
    repo: AvailabilityRepository = Depends(),
    account_data=Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    repo.delete_past_availabilities()
    return {"detail": "Past availabilities deleted"}
