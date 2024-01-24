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
        # Use your repo to get the user based on the
        # username (which could be an email)
        return user.get(email)

    def get_account_getter(
        self,
        user: UsersQueries = Depends(),
    ):
        # Return the users. That's it.
        return user

    def get_hashed_password(self, user: UsersOutWithPassword):
        # Return the encrypted password value from your
        # user object
        return user.hashed_password

    def get_user_data_for_cookie(self, user: UsersOutWithPassword):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return user.email, UsersOut(**user.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
