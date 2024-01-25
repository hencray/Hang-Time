from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from queries.groups import GroupsIn, GroupsRepository
from authenticator import authenticator
from queries.users import UsersOut

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
