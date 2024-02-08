import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";

const EventsTable = ({ refreshList }) => {
  const { token } = useToken();
  const [events, setEvents] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.REACT_APP_API_HOST;
  const userId = getUserId(token);

  useEffect(() => {
    const getUserGroups = async () => {
      const response = await fetch(`${baseURL}/groups?user_id=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserGroups(data);
        setLoading(false);
      }
    };

    getUserGroups();
  }, [token, baseURL, userId]);

  useEffect(() => {
    if (!loading) {
      const fetchEvents = async () => {
        const response = await fetch(`${baseURL}/events`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          let data = await response.json();
          const userGroupIds = userGroups.map((group) => group.id);
          const currentDate = new Date();

          data = data.filter((event) => {
            const eventEndDate = new Date(event.end_date);

            return (
              userGroupIds.includes(event.group_id) &&
              eventEndDate < currentDate
            );
          });

          setEvents(data);
        }
      };

      fetchEvents();
    }
  }, [token, baseURL, refreshList, userGroups, loading]);

  return (
    <>
      <h1>Event History</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.start_date}</td>
              <td>{event.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EventsTable;
