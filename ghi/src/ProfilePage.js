import { Navbar } from "./Navbar";
import useToken from "@galvanize-inc/jwtdown-for-react";
import CreateAvailability from "./CreateAvailability";
import { useNavigate } from "react-router-dom";
import "./App.css";

export const ProfilePage = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  if (!token) {
    // If there's no token, navigate to the login page
    navigate("/login");
    return null;
  }

  return (
    <div>
      <Navbar />
      <h1>Profile Page</h1>
      <div className="form-container">{token && <CreateAvailability />}</div>
    </div>
  );
};
