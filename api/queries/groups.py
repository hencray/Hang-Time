from pydantic import BaseModel
from queries.pool import pool
from typing import List


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

    def get_all(self) -> List[GroupsOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, name, description
                    FROM groups
                    """
                )
                groups = result.fetchall()
                return [
                    GroupsOut(
                        id=row[0],
                        name=row[1],
                        description=row[2]
                    ) for row in groups]

    def delete_by_group_id(self, group_id: int) -> None:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM usergroups
                    WHERE group_id = %s
                    """,
                    (group_id,)
                )

    def update(self, id: int, groups: GroupsIn) -> GroupsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE groups
                    SET name = %s, description = %s
                    WHERE id = %s
                    RETURNING id;
                    """,
                    [
                        groups.name,
                        groups.description,
                        id,
                    ],
                )
                id = db.fetchone()[0]
                old_data = groups.dict()
                return GroupsOut(id=id, **old_data)
