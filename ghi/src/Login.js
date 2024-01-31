import React, { useState } from "react";
import { useAuth } from "./Apiauth";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setUsername("");
      setPassword("");
      onLogin();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container login-form">
      <h2 className="form-title">Login</h2>
      <form className="form">
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
        <button type="button" className="submit-button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
