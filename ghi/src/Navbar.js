import { Link, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

export const Navbar = () => {
  const { token } = useToken();
  const location = useLocation();

  return (
    token && (
      <nav>
        {location.pathname !== "/" && (
          <Link className="link-style" to="/">
            Home
          </Link>
        )}
        {location.pathname !== "/events" && (
          <Link className="link-style" to="/events">
            Events
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
        {location.pathname !== "/" && (
          <Link className="link-style" to="/">
            Logout
          </Link>
        )}
      </nav>
    )
  );
};
