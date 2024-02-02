from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import List
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.users import (
    UsersIn,
    UsersOut,
    UsersQueries,
    DuplicateUserError,
)


class UsersForm(BaseModel):
    username: str
    password: str


class UsersToken(Token):
    user: UsersOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/protected", response_model=bool)
async def get_protected(
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=UsersToken | None)
async def get_token(
    request: Request,
    user: UsersOut = Depends(authenticator.try_get_current_account_data),
) -> UsersToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.post("/users", response_model=UsersToken | HttpError)
async def create_user(
    info: UsersIn,
    request: Request,
    response: Response,
    account_data=Depends(
        authenticator.try_get_current_account_data
    ),  # Add this line
    repo: UsersQueries = Depends(),
):
    if account_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Logged in users cannot create new users",
        )

    hashed_password = authenticator.hash_password(info.password)
    try:
        user = repo.create(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a user with those credentials",
        )
    form = UsersForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return UsersToken(user=user, **token.dict())


@router.get("/users", response_model=List[UsersOut])
async def get_all_users(
    user: UsersOut = Depends(authenticator.get_current_account_data),
    repo: UsersQueries = Depends(),
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User must be authenticated to view users",
        )

    return repo.get_all()
