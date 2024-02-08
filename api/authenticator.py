import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UsersQueries, UsersOut, UsersOutWithPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        user: UsersQueries,
    ):
        return user.get(email)

    def get_account_getter(
        self,
        user: UsersQueries = Depends(),
    ):
        return user

    def get_hashed_password(self, user: UsersOutWithPassword):
        return user.hashed_password

    def get_user_data_for_cookie(self, user: UsersOutWithPassword):
        return user.email, UsersOut(**user.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
