from fastapi import APIRouter, Depends
from queries.users import UsersIn, UsersRepository

router = APIRouter()


@router.post("/users")
def create_user(user: UsersIn, repo: UsersRepository = Depends()):
    created_user = repo.create(user)
    return created_user
