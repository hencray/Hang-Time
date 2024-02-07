import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";

function EventAttendance({ eventId }) {
  const { token } = useAuthContext();
  const [isChecked, setIsChecked] = useState(false);
  const baseURL = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    const storedValue = localStorage.getItem(`attendance_${eventId}`);
    if (storedValue !== null) {
      setIsChecked(storedValue === "true");
    }
  }, [eventId]);

  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);

    try {
      const response = await fetch(`${baseURL}/eventattendees`, {
        method: isChecked ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: getUserId(token),
          event_id: eventId,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to ${isChecked ? "attend" : "leave"} the event`
        );
      }

      localStorage.setItem(`attendance_${eventId}`, isChecked.toString());
    } catch (error) {
      console.error(`Error ${isChecked ? "attending" : "leaving"} event:`, error);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {isChecked ? "Attending" : "Not Attending"}
    </div>
  );
}

export default EventAttendance;
