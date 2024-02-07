import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";

function AttendEvent({ eventId }) {
  const { token } = useAuthContext();
  const [isMember, setIsMember] = useState(false);
  const [isAttending, setIsAttending] = useState(false);
  const baseURL = process.env.REACT_APP_API_HOST;
  const userId = getUserId(token);

  useEffect(() => {
    const checkMembership = async () => {
      if (!eventId) return;

      try {
        const response = await fetch(`${baseURL}/users/${userId}/events`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Check if the event ID is present in the response
          const isMember = data.some((event) => event.id === eventId);
          setIsMember(isMember);

          // Check if the user is attending the event
          const isAttending = data.some(
            (event) => event.id === eventId && event.is_attending
          );
          setIsAttending(isAttending);
        } else {
          console.error("Error fetching user's events:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user's events:", error.message);
      }
    };

    checkMembership();
  }, [token, baseURL, userId, eventId]);

const handleAttendEvent = async () => {
  if (!isMember) {
    alert("You are not a member of the group.");
    return;
  }

  if (isAttending) {
    alert("You are already attending the event.");
    return;
  }

  const parsedUserId = parseInt(userId);
  const parsedEventId = parseInt(eventId);

  if (isNaN(parsedUserId) || isNaN(parsedEventId)) {
    console.error("Invalid user ID or event ID:", userId, eventId);
    alert("Error attending the event. Invalid user ID or event ID.");
    return;
  }

  try {
    const response = await fetch(`${baseURL}/eventattendees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: parsedUserId,
        event_id: parsedEventId,
      }),
    });

    if (response.ok) {
      alert("Successfully attended the event!");
      setIsAttending(true);
    } else {
      const errorData = await response.json();
      console.error("Error attending the event:", errorData);
      alert("Error attending the event. Please try again.");
    }
  } catch (error) {
    console.error("Error attending the event:", error.message);
  }
};

  return (
    <div>
      {isMember ? (
        <button onClick={handleAttendEvent}>
          {isAttending ? "Attending" : "Attend Event"}
        </button>
      ) : (
        <p>You must be a part of the group to join this event.</p>
      )}
    </div>
  );
}

export default AttendEvent;
