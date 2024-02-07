import React, { useState, useEffect } from "react";

const EventAttendance = ({ eventId }) => {
  const [attending, setAttending] = useState(false);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    const fetchAttendanceStatus = async () => {
      try {
        const response = await fetch(`${baseURL}/event_attendance/${eventId}`);
        if (response.ok) {
          const data = await response.json();
          setAttending(data.attending);
        } else {
          console.error("Error fetching attendance status:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching attendance status:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceStatus();
  }, [baseURL, eventId]);

  const handleAttendanceToggle = async () => {
    try {
      const response = await fetch(`${baseURL}/event_attendance/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_id: eventId }),
      });
      if (response.ok) {
        const data = await response.json();
        setAttending(data.attending);
      } else {
        console.error("Error toggling attendance status:", response.statusText);
      }
    } catch (error) {
      console.error("Error toggling attendance status:", error.message);
    }
  };

  if (loading) {
    return <p>Loading attendance status...</p>;
  }

  return (
    <div>
      <p>Attending: {attending ? "Yes" : "No"}</p>
      <button onClick={handleAttendanceToggle}>
        {attending ? "Leave Event" : "Attend Event"}
      </button>
    </div>
  );
};

export default EventAttendance;
