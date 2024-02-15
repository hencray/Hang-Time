from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator

client = TestClient(app)


def test_get_token_not_logged_in():
    app.dependency_overrides[authenticator.try_get_current_account_data] = (
        lambda: None
    )
    response = client.get("/token")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() is None


def test_get_token_logged_in():
    user = {
        "id": 1,
        "first_name": "test",
        "last_name": "test",
        "email": "test@test.com",
        "password": "test",
    }
    app.dependency_overrides[authenticator.try_get_current_account_data] = (
        lambda: user
    )

    client.cookies[authenticator.cookie_name] = "Test"
    response = client.get("/token")
    app.dependency_overrides = {}
    assert response.status_code == 200
    data = response.json()
    assert data["access_token"] == "Test"
    assert data["token_type"] == "Bearer"
