import React, { useState } from "react";
import { useAuth } from "./Apiauth";
import { useNavigate } from "react-router-dom";
import CreateUserForm from "./CreateAccount.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      setUsername("");
      setPassword("");
      const data = JSON.parse(
        window.atob(
          response.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
        )
      );
      onLogin(data.account, response);
      navigate("/availability");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container login-form">
      <h2 className="form-title">Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Email"
          autoComplete="email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <CreateUserForm />
    </div>
  );
};


export default LoginForm;
