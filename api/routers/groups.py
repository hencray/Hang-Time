from fastapi import APIRouter, Depends
from queries.groups import GroupsIn, GroupsRepository

router = APIRouter()


@router.post("/groups")
def create_group(groups: GroupsIn, repo: GroupsRepository = Depends()):
    return repo.create(groups)
