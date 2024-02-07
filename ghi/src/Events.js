import { Navbar } from "./Navbar";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export const Events = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  if (!token) {
    // If there's no token, navigate to the login page
    navigate("/login");
  }

  return (
    <div>
      <Navbar />
      <h1>Event Detail</h1>
      <div className="form-container">
        {/* Add your event detail components here */}
      </div>
    </div>
  );
};
