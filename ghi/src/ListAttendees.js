import React, { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";

function ListAttendees() {
  const { token } = useAuthContext();
  const [attendees, setAttendees] = useState([]);
  const [filter, setFilter] = useState("");
  const [eventNames, setEventNames] = useState([]);
  const baseURL = process.env.REACT_APP_API_HOST;
  const userId = getUserId(token);

  const fetchAttendeesForEvent = useCallback(
    async (eventId) => {
      try {
        const response = await fetch(`${baseURL}/eventattendees/${eventId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAttendees(data);
        } else {
          throw new Error("Failed to fetch attendees");
        }
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    },
    [baseURL, token]
  );

  const fetchUserGroupEvents = useCallback(async () => {
    try {
      const response = await fetch(`${baseURL}/users/${userId}/events`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEventNames(data);
      } else {
        throw new Error("Failed to fetch user group events");
      }
    } catch (error) {
      console.error("Error fetching user group events:", error);
    }
  }, [baseURL, token, userId]);

  useEffect(() => {
    fetchUserGroupEvents();
  }, [fetchUserGroupEvents]);

  useEffect(() => {
    if (filter) {
      fetchAttendeesForEvent(filter);
    }
  }, [fetchAttendeesForEvent, filter]);

  return (
    <div>
      <div className="w-1/2 mx-auto">
        <h1 className="text-center text-2xl font-bold leading-10 tracking-tight text-secondary md:text-2xl">
          List Attendees
        </h1>
        <select
          className="w-full"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Select an event</option>
          {eventNames.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
      <table className="w-1/2 mx-auto rounded-lg shadow-lg">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee.id}>
              <td>{attendee.first_name}</td>
              <td>{attendee.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListAttendees;
