import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";
import { Link } from "react-router-dom";
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
    <div className="rounded-2xl shadow-xl mt-4 mb-8 max-w-[96%]">
      <div className="flex justify-between items-center">
        <h1 className="mt-6 text-4xl font-bold leading-10 tracking-tight text-secondary md:text-4xl">
          Upcoming Events
        </h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Filter by Group...</option>
          {groupNames.map((group) => (
            <option key={group.id} value={group.name}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
                <td className="text-center">
                  <button className="btn btn-primary">
                    <Link to={`/event/${usersgroupsevent.id}`}>
                      {usersgroupsevent.name}
                    </Link>
                  </button>
                </td>
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
    </div>
  );
}

export default ListUsersGroupsEvents;
