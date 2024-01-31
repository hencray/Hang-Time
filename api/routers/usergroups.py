from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response,
    Request,
)
from pydantic import BaseModel
from queries.usergroups import UserGroupIn, UserGroupRepository
from queries.users import UsersOut
from authenticator import authenticator

router = APIRouter()


class HttpError(BaseModel):
    detail: str


@router.post("/usergroups", response_model=dict | HttpError)
async def add_user_to_group(
    user_group: UserGroupIn,
    request: Request,
    response: Response,
    repo: UserGroupRepository = Depends(),
    user: UsersOut = Depends(authenticator.get_current_account_data),
):
    repo.add_user_to_group(user_group)
    return {"message": "User added to group"}


@router.get("/usergroups/{user_id}", response_model=list | HttpError)
async def get_user_groups(
    user_id: int,
    user: UsersOut = Depends(authenticator.get_current_account_data),
    repo: UserGroupRepository = Depends(),
):
    groups = repo.get_user_groups(user_id)
    if not groups:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User or Groups not found",
        )
    return groups


@router.delete(
    "/usergroups/{user_id}/{group_id}", response_model=dict | HttpError
)
async def leave_group(
    user_id: int,
    group_id: int,
    user: UsersOut = Depends(authenticator.get_current_account_data),
    repo: UserGroupRepository = Depends(),
):
    result = repo.remove_user_from_group(user_id, group_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User or Group not found",
        )
    return {"message": "User removed from group"}
