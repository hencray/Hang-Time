import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";

function EventAttendance({ eventId, setAttendanceChanged }) {
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
    const targetChecked = e.target.checked;

    try {
      const response = await fetch(`${baseURL}/eventattendees`, {
        method: targetChecked ? "POST" : "DELETE",
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
          `Failed to ${targetChecked ? "attend" : "leave"} the event`
        );
      }

      setIsChecked(targetChecked);
      localStorage.setItem(`attendance_${eventId}`, targetChecked.toString());
      setAttendanceChanged((prevState) => !prevState);

      if (targetChecked) {
        showAlert("You are now attending this event.", "alert-success");
      } else {
        showAlert("You are no longer attending this event.", "alert-danger");
      }
    } catch (error) {
      console.error(
        `Error ${targetChecked ? "attending" : "leaving"} event:`,
        error
      );
    }
  };

  const showAlert = (message, className) => {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert ${className}`;
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.remove();
    }, 2000);
  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="checkbox checkbox-primary"
        />
      </label>
    </div>
  );
}

export default EventAttendance;
