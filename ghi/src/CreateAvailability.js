import React, { useState, useEffect } from "react";
import { useAuth } from "./Apiauth";
import { useNavigate } from 'react-router-dom';

const CreateAvailability = () => {
  const { user, token } = useAuth();
  const [day, setDay] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const baseURL = process.env.REACT_APP_API_HOST;
    const response = await fetch("http://localhost:8000/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        day,
        is_match: true,
        user_id: Number(user.id),
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
