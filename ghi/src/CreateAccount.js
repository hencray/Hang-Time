import React, { useState } from "react";
import "./App.css";

const CreateAccount = ({ onCreateUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add a new state variable for the error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log(data);

      // Clear the form fields after successful submission
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setErrorMessage(""); // Clear the error message after successful submission

      // Invoke the callback function passed from the parent
      if (onCreateUser) {
        onCreateUser();
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message); // Set the error message
    }
  };

  return (
    <div className="form-container">
      <div className="create-account-form">
        <h2 className="form-title">Create Account</h2>
        {/* Display the error message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-field">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="username"
              required
            />
          </div>
          <div className="form-field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              autoComplete="given-name"
              required
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              autoComplete="family-name"
              required
            />
          </div>
          <div className="form-field">
            <button type="submit" className="submit-button">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
