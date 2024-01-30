from fastapi.testclient import TestClient
from main import app
from queries.eventattendees import (
    EventAttendeesIn,
    EventAttendeesRepository,
    EventAttendeesOut,
)
from queries.events import EventsRepository
from authenticator import authenticator

client = TestClient(app)


class FakeEventAttendeesRepository:
    def attend_event(
        self, attendance_data: EventAttendeesIn
    ) -> EventAttendeesOut:
        return EventAttendeesOut(
            id=1,
            user_id=attendance_data.user_id,
            event_id=attendance_data.event_id,
            first_name="John",
            last_name="Doe",
        )

    def get_attendees(self, event_id: int):
        return []

    def leave_event(self, attendance_data: EventAttendeesIn) -> bool:
        return True


class FakeEventRepository:
    def get_event(self, event_id: int):
        return {
            "id": event_id,
            "name": "Test Event",
            "description": "This is a test event",
        }


def test_attend_event():
    user = {
        "id": 1,
        "email": "user1@gmail.com",
        "username": "user1",
        "hashed_password": "123123123",
    }
    attendance_data = EventAttendeesIn(user_id=1, event_id=1)
    attendance_out = EventAttendeesOut(
        id=1, user_id=1, event_id=1, first_name="John", last_name="Doe"
    )

    app.dependency_overrides[
        EventAttendeesRepository
    ] = FakeEventAttendeesRepository
    app.dependency_overrides[EventsRepository] = FakeEventRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: user

    response = client.post("/eventattendees", json=attendance_data.dict())

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == attendance_out.dict()


def test_leave_event():
    user = {
        "id": 1,
        "email": "user1@gmail.com",
        "username": "user1",
        "hashed_password": "123123123",
    }
    attendance_data = EventAttendeesIn(user_id=1, event_id=1)

    app.dependency_overrides[
        EventAttendeesRepository
    ] = FakeEventAttendeesRepository
    app.dependency_overrides[EventsRepository] = FakeEventRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: user

    response = client.request(
        "DELETE", "/eventattendees", json=attendance_data.dict()
    )

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() is True


def test_get_attendees():
    user = {
        "id": 1,
        "email": "user1@gmail.com",
        "username": "user1",
        "hashed_password": "123123123",
    }

    app.dependency_overrides[
        EventAttendeesRepository
    ] = FakeEventAttendeesRepository
    app.dependency_overrides[EventsRepository] = FakeEventRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: user

    response = client.get("/eventattendees/1")

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
