from fastapi.testclient import TestClient
from datetime import date
from main import app
from queries.availability import (
    AvailabilityIn,
    AvailabilityRepository,
    AvailabilityOut,
)
from authenticator import authenticator

client = TestClient(app)


class FakeAvailabilityRepository:
    def create(self, availability_in: AvailabilityIn, user: dict):
        return AvailabilityOut(
            day=availability_in.day,
            is_match=availability_in.is_match,
            user_id=availability_in.user_id,
            id=1,
        )

    def check_availability_exists(self, user_id: int, day: date) -> bool:

        return False


def test_create_availability():
    user = {
        "id": 1,
        "email": "user1@gmail.com",
        "username": "user1",
        "hashed_password": "123123123",
    }
    availability_in = AvailabilityIn(
        day=date(2022, 1, 1),
        is_match=True,
        user_id=1,
    )
    availability_out = AvailabilityOut(
        day=date(2022, 1, 1),
        is_match=True,
        user_id=1,
        id=1,
    )

    # Override the dependencies
    app.dependency_overrides[
        AvailabilityRepository
    ] = FakeAvailabilityRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: user

    # Act
    response = client.post(
        "/availability",
        json={
            **availability_in.dict(),
            "day": availability_in.day.isoformat(),
        },
    )

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        **availability_out.dict(),
        "day": availability_out.day.isoformat(),
    }
