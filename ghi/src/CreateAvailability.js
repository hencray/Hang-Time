import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const CreateAvailability = () => {
  const { token } = useToken();
  const [day, setDay] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${baseURL}/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        day,
        is_match: true,
        user_id: Number(token.sub), // Assuming the user id is stored in the 'sub' field of the token
      }),
    });

    if (response.ok) {
      setMessage("Availability created successfully");
    } else {
      const errorData = await response.json();
      setMessage(`Error creating availability: ${errorData.detail}`);
    }
  };

  return (
    <div>
      <h1>Create Availability</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Day:
          <input
            type="date"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateAvailability;
