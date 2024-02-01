import LoginForm from "./LoginForm";
import Out from "./Out";
import TokenCard from "./TokenCard";
import UserDataCard from "./UserDataCard";
import SignupForm from "./SignUpForm";

import useToken from "@galvanize-inc/jwtdown-for-react";

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
      {token && <Out />}
    </div>
  );
};
