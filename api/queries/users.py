from pydantic import BaseModel
from queries.pool import pool


class DuplicateUserError(ValueError):
    pass


class UsersIn(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str


class UsersOut(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str


class UsersOutWithPassword(UsersOut):
    hashed_password: str


class UsersQueries:
    def get(self, email: str) -> UsersOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT * FROM authenticated_users
                    WHERE email = %s;
                    """,
                    [email],
                ).fetchone()

                if not result:
                    raise ValueError("Email not found.")
                (
                    user_id,
                    email,
                    first_name,
                    last_name,
                    hashed_password,
                ) = result
                return UsersOutWithPassword(
                    id=user_id,
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    hashed_password=hashed_password,
                )

    def create(
        self, info: UsersIn, hashed_password: str
    ) -> UsersOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                existing_user = db.execute(
                    """
                        SELECT * FROM authenticated_users
                        WHERE email = %s;
                        """,
                    [info.email],
                ).fetchone()

                if existing_user:
                    raise DuplicateUserError(
                        "A user with this email already exists."
                    )

                result = db.execute(
                    """
                        INSERT INTO authenticated_users
                            (First_Name, Last_Name, email, password)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                    [
                        info.first_name,
                        info.last_name,
                        info.email,
                        hashed_password,
                    ],
                )
                user_id = result.fetchone()[0]
                user_data = info.dict()
                return UsersOutWithPassword(
                    id=user_id, hashed_password=hashed_password, **user_data
                )
