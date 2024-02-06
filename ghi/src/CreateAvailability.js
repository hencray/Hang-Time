import React, { useState, useEffect, useCallback } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";

const CreateAvailability = () => {
  const { token } = useToken();
  const [day, setDay] = useState("");
  const [message, setMessage] = useState("");
  const baseURL = process.env.REACT_APP_API_HOST;
  const userId = getUserId(token);

  const deleteOldAvailabilities = useCallback(async () => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const response = await fetch(`${baseURL}/availability/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const availabilities = await response.json();

    availabilities.forEach(async (availability) => {
      const availabilityDate = new Date(availability.day);
      if (availabilityDate < sevenDaysAgo) {
        await fetch(`${baseURL}/availability/${availability.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    });
  }, [baseURL, token, userId]);

  useEffect(() => {
    deleteOldAvailabilities();
  }, [deleteOldAvailabilities]);

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
        user_id: Number(userId),
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
