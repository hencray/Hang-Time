import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";
import EventAttendance from "./EventAttendance";

function ListUsersGroupsEvents() {
  const { token } = useAuthContext();
  const [usersgroupsevents, setUsersgroupsevents] = useState([]);
  const [filter, setFilter] = useState("");
  const [groupNames, setGroupNames] = useState([]);
  const baseURL = process.env.REACT_APP_API_HOST;
  const userId = getUserId(token);

  useEffect(() => {
    const fetchUsersGroupsEvents = async () => {
      const response = await fetch(`${baseURL}/users/${userId}/events`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsersgroupsevents(data);
        const uniqueGroups = data.reduce((acc, event) => {
          if (!acc.find((group) => group.id === event.group_id)) {
            acc.push({ id: event.group_id, name: event.group_name });
          }
          return acc;
        }, []);
        setGroupNames(uniqueGroups);
      }
    };

    fetchUsersGroupsEvents();
  }, [token, baseURL, userId]);

  const filteredEvents = filter
    ? usersgroupsevents.filter((event) => event.group_name === filter)
    : usersgroupsevents;

  return (
    <div>
      <h1>List Users Groups Events</h1>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        {groupNames.map((group) => (
          <option key={group.id} value={group.name}>
            {group.name}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Group Name</th>
            <th>Location</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((usersgroupsevent) => (
            <tr key={usersgroupsevent.id}>
              <td>{usersgroupsevent.name}</td>
              <td>{usersgroupsevent.description}</td>
              <td>{usersgroupsevent.start_date}</td>
              <td>{usersgroupsevent.end_date}</td>
              <td>{usersgroupsevent.group_name}</td>
              <td>{usersgroupsevent.location}</td>
              <td>
                <EventAttendance eventId={usersgroupsevent.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListUsersGroupsEvents;
