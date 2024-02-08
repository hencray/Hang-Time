import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./App.css";

export const Main = () => {
  const { token } = useToken();

  return (
    <div>
      <h1 className="h1-center-top">Welcome To HangTime</h1>
      {!token && <SignupForm />}
      {!token && <LoginForm />}
    </div>
  );
};
