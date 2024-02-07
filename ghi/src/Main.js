import React from "react";
import LoginForm from "./LoginForm";
import Out from "./Out";
import SignupForm from "./SignUpForm";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Navbar } from "./Navbar"; // Import the Navbar component
import "./App.css";

export const Main = () => {
  const { token } = useToken();

  return (
    <div>
      {token && <Navbar />}{" "}
      {/* Include the Navbar component when a token is present */}
      <h1 className="h1-center-top">Welcome To HangTime</h1>
      {!token && <SignupForm />}
      {!token && <LoginForm />}
      {token && <Out />}
    </div>
  );
};
