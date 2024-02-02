from queries.usergroups import UserGroupIn, UserGroupOut, UserGroupRepository
from fastapi.testclient import TestClient
from main import app
from queries.usergroups import UserAlreadyError
from authenticator import authenticator

client = TestClient(app)


class FakeUserGroupRepository:
    def __init__(self):
        self.user_groups = []

    def add_user_to_group(self, user_group: UserGroupIn):
        if any(
            ug
            for ug in self.user_groups
            if ug.user_id == user_group.user_id
            and ug.group_id == user_group.group_id
        ):
            raise UserAlreadyError("User already exists in group")
        self.user_groups.append(user_group)

    def get_user_groups(self, user_id: int):
        return [
            UserGroupOut(
                group_id=ug.group_id,
                name="Test Group",
                description="This is a test group",
            )
            for ug in self.user_groups
            if ug.user_id == user_id
        ]

    def remove_user_from_group(self, user_id: int, group_id: int):
        self.user_groups = [
            ug
            for ug in self.user_groups
            if not (ug.user_id == user_id and ug.group_id == group_id)
        ]
        return True


# Create an instance of FakeUserGroupRepository
fake_repo = FakeUserGroupRepository()


def test_add_user_to_group():
    # Arrange
    user_group_in = UserGroupIn(user_id=1, group_id=1)
    user = {
        "id": 1,
        "email": "user1@gmail.com",
        "username": "user1",
        "hashed_password": "123123123",
    }

    # Override the dependencies
    app.dependency_overrides[UserGroupRepository] = lambda: fake_repo
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: user

    # Act
    response = client.post(
        "/usergroups",
        json=user_group_in.dict(),
    )

    # Clear the dependency overrides
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200


def test_get_user_groups():
    # Arrange
    user_id = 1
    user = {
        "id": 1,
        "email": "user1@gmail.com",
        "username": "user1",
        "hashed_password": "123123123",
    }

    # Override the dependencies
    app.dependency_overrides[UserGroupRepository] = lambda: fake_repo
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: user

    # Act
    response = client.get(f"/usergroups/{user_id}")

    # Clear the dependency overrides
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == [
        {
            "group_id": 1,
            "name": "Test Group",
            "description": "This is a test group",
        }
    ]


def test_remove_user_from_group():
    # Arrange
    user_id = 1
    group_id = 1
    user = {
        "id": 1,
        "email": "user1@gmail.com",
        "username": "user1",
        "hashed_password": "123123123",
    }

    # Override the dependencies
    app.dependency_overrides[UserGroupRepository] = lambda: fake_repo
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: user

    # Act
    response = client.delete(f"/usergroups/{user_id}/{group_id}")

    # Clear the dependency overrides
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
