from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from queries.groups import GroupsIn, GroupsRepository
from authenticator import authenticator
from queries.users import UsersOut
from queries.groups import GroupsOut
from queries.usergroups import UserGroupRepository
from typing import List

router = APIRouter()


class GroupCreationError(BaseModel):
    detail: str


@router.post("/groups", response_model=GroupsIn)
async def create_group(
    groups: GroupsIn,
    user: UsersOut = Depends(authenticator.get_current_account_data),
    repo: GroupsRepository = Depends(),
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User must be authenticated to create a group",
        )

    created_group = repo.create(groups)
    return created_group


@router.get("/groups", response_model=List[GroupsOut])
async def get_all_groups(
    user: UsersOut = Depends(authenticator.get_current_account_data),
    repo: GroupsRepository = Depends(),
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User must be authenticated to view groups",
        )

    return repo.get_all()


@router.delete("/groups/{id}")
async def delete_group(
    id: int,
    user: UsersOut = Depends(authenticator.get_current_account_data),
    groups_repo: GroupsRepository = Depends(),
    usergroups_repo: UserGroupRepository = Depends(),
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User must be authenticated to delete a group",
        )

    usergroups_repo.delete_by_group_id(id)
    groups_repo.delete_by_id(id)
    return {"message": "Group deleted successfully"}


@router.put("/groups/{id}", response_model=GroupsOut)
async def update_group(
    id: int,
    groups: GroupsIn,
    user: UsersOut = Depends(authenticator.get_current_account_data),
    repo: GroupsRepository = Depends(),
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User must be authenticated to update a group",
        )

    return repo.update(id, groups)
