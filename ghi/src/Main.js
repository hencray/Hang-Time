import LoginForm from "./LoginForm";
import Out from "./Out";
import TokenCard from "./TokenCard";
import UserDataCard from "./UserDataCard";
import SignupForm from "./SignUpForm";
import CreateAvailability from "./CreateAvailability";
import ListAvailabilities from "./ListAvailabilities";
import MatchingAvailabilities from "./MatchingAvailabilities";
import ListUsersGroupsEvents from "./ListUsersGroupsEvents";

import useToken from "@galvanize-inc/jwtdown-for-react";
import CreateEventForm from "./CreateEventForm";

export const Main = () => {
  const { token } = useToken();
  return (
    <div>
      <p>--- sign up ---</p>
      {!token && <SignupForm />}
      <p>--- end sign up ---</p>
      {!token && <LoginForm />}
      {token && <TokenCard />}
      {token && <UserDataCard />}
      {token && <CreateEventForm />}
      {token && <ListUsersGroupsEvents />}
      {token && <CreateAvailability />}
      {token && <ListAvailabilities />}
      {token && <MatchingAvailabilities />}
      {token && <Out />}
    </div>
  );
};
