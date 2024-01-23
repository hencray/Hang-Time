from fastapi import APIRouter, Depends
from queries.usergroups import UserGroupIn, UserGroupRepository


router = APIRouter()


@router.post("/usergroups")
def add_user_to_group(
    user_group: UserGroupIn, repo: UserGroupRepository = Depends()
):
    repo.add_user_to_group(user_group)
    return {"message": "User added to group"}


@router.get("/usergroups/{user_id}")
def get_user_groups(user_id: int, repo: UserGroupRepository = Depends()):
    return repo.get_user_groups(user_id)


@router.delete("/usergroups/{user_id}/{group_id}")
def leave_group(
    user_id: int, group_id: int, repo: UserGroupRepository = Depends()
):
    repo.remove_user_from_group(user_id, group_id)
    return {"message": "User removed from group"}
