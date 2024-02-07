import { Link, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import CreateAvailability from "./CreateAvailability";
import "./App.css";

export const ProfilePage = () => {
  const { token } = useToken();
  const location = useLocation();
  return (
    <div>
      {token && (
        <nav>
          {location.pathname !== "/" && (
            <Link className="link-style" to="/">
              Home
            </Link>
          )}
          {location.pathname !== "/profile" && (
            <Link className="link-style" to="/profile">
              Profile
            </Link>
          )}
          {location.pathname !== "/Group" && (
            <Link className="link-style" to="/Group">
              Groups
            </Link>
          )}
        </nav>
      )}
      <h1>Profile Page</h1>
      <div className="form-container">{token && <CreateAvailability />}</div>
    </div>
  );
};
