import { useToken, useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import React from "react";

function LoginForm() {
  const { setToken } = useAuthContext();

  const handleLogin = async (email, password) => {
    // Constructing the details object with email and password
    const details = {
      email: email,
      password: password,
    };

    // Making the POST request
    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token); // Update token in context
      } else {
        // Handle different response statuses here
        console.error("Login failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch operation:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    await handleLogin(email, password);
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input name="email" type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input name="password" type="password" className="form-control" />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
