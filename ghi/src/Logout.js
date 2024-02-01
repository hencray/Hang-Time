import React from "react";
import { useAuth } from "./Apiauth";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container logout-form">
      <h2 className="form-title">Logout</h2>
      <form className="form">
        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default Logout;
