import { Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

export const Navbar = () => {
  const { token } = useToken();
  const { logout } = useToken();

  return (
    <nav className="navbar bg-primary bg-opacity-80 text-primary-content rounded-2xl shadow-xl mt-4 mb-8 max-w-[96%] mx-auto">
      <div className="navbar-start">
        <Link to="/">
          <button className="btn btn-ghost text-4xl text-base-100">
            Hang-Time
          </button>
        </Link>
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
      <div className="navbar-center hidden lg:flex">
        {token && (
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="link-style text-2xl text-base-100" to="/events">
                Events
              </Link>
            </li>
            <li>
              <Link className="link-style text-2xl text-base-100" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className="link-style text-2xl text-base-100" to="/Group">
                Groups
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="navbar-end">
        {token ? (
          <Link to="/" className="text-2xl text-base-100" onClick={logout}>
            Logout
          </Link>
        ) : (
          <Link to="/login" className="text-2xl text-base-100">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
