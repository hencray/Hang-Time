from pydantic import BaseModel
from queries.accounts import pool


class GroupsIn(BaseModel):
    name: str
    description: str


class GroupsOut(BaseModel):
    id: int
    name: str
    description: str


class GroupsRepository:
    def create(self, groups: GroupsIn) -> GroupsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO groups
                        (name, description)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [
                        groups.name,
                        groups.description,
                    ],
                )
                id = result.fetchone()[0]
                old_data = groups.dict()
                return GroupsOut(id=id, **old_data)
