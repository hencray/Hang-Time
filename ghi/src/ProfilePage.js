import useToken from "@galvanize-inc/jwtdown-for-react";
import CreateAvailability from "./CreateAvailability";
import { useNavigate } from "react-router-dom";
import "./App.css";

export const ProfilePage = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <div className="form-container">{token && <CreateAvailability />}</div>
    </div>
  );
};
