from typing import List
from pydantic import BaseModel
from queries.pool import pool


class UserGroupIn(BaseModel):
    user_id: int
    group_id: int


class UserGroupOut(BaseModel):
    group_id: int
    name: str
    description: str


class UserAlreadyError(Exception):
    pass


class UserGroupRepository:
    def add_user_to_group(self, user_group: UserGroupIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT COUNT(*)
                    FROM usergroups
                    WHERE user_id = %s AND group_id = %s;
                    """,
                    [user_group.user_id, user_group.group_id],
                )
                count = db.fetchone()[0]

                if count == 0:
                    db.execute(
                        """
                        INSERT INTO usergroups (user_id, group_id)
                        VALUES (%s, %s);
                        """,
                        [user_group.user_id, user_group.group_id],
                    )
                else:
                    raise UserAlreadyError("User already exists in group")

    def get_user_groups(self, user_id: int) -> List[UserGroupOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT g.id, g.name, g.description
                    FROM groups g
                    JOIN usergroups ug ON ug.group_id = g.id
                    WHERE ug.user_id = %s;
                    """,
                    [user_id],
                )
                rows = db.fetchall()
                result = []
                for row in rows:
                    group_data = {
                        "group_id": row[0],
                        "name": row[1],
                        "description": row[2],
                    }
                    result.append(UserGroupOut(**group_data))
                return result

    def remove_user_from_group(self, user_id: int, group_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM usergroups
                    WHERE user_id = %s AND group_id = %s;
                    """,
                    [user_id, group_id],
                )
                return True
