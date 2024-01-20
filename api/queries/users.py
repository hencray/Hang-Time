from pydantic import BaseModel
from queries.accounts import pool


class UsersIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str


class UsersOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str


class UsersRepository:
    def create(self, user: UsersIn) -> UsersOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO authenticated_users
                        (First_Name, Last_Name, email, password)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        user.first_name,
                        user.last_name,
                        user.email,
                        user.password,
                    ],
                )
                id = result.fetchone()[0]
                old_data = user.dict()
                return UsersOut(id=id, **old_data)
