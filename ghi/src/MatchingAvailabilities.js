import React, { useState, useEffect, useCallback } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";

const MatchingAvailabilities = () => {
  const { token } = useToken();
  const [date, setDate] = useState("");
  const [availabilities, setAvailabilities] = useState([]);
  const [noGroup, setNoGroup] = useState(false);
  const baseURL = process.env.REACT_APP_API_HOST;
  const userId = getUserId(token);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const fetchUsers = useCallback(async () => {
    const response = await fetch(`${baseURL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }

    return [];
  }, [baseURL, token]);

  const fetchAvailabilities = useCallback(async () => {
    const response = await fetch(`${baseURL}/availabilities?date=${date}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.availabilities;
    }

    return [];
  }, [baseURL, token, date]);

  const fetchUserGroups = useCallback(
    async (userId) => {
      const response = await fetch(`${baseURL}/usergroups/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      return [];
    },
    [baseURL, token]
  );

  const fetchAvailabilitiesWithUserNames = useCallback(async () => {
    const [users, availabilities, userGroups] = await Promise.all([
      fetchUsers(),
      fetchAvailabilities(),
      fetchUserGroups(userId),
    ]);

    if (userGroups.length === 0) {

      setNoGroup(true);
      return;
    }

    const availabilitiesWithUserNames = availabilities
      .filter(
        (availability) =>
          String(availability.user_id) !== String(userId) &&
          userGroups.some((group) => group.id === availability.group_id)
      )
      .map((availability) => {
        const user = users.find(
          (user) => String(user.id) === String(availability.user_id)
        );
        const groups = userGroups.filter(
          (group) => group.id === availability.group_id
        );
        return {
          ...availability,
          userName: user ? user.first_name : "Unknown",
          userEmail: user ? user.email : "Unknown",
          groupNames: groups.map((group) => group.name),
        };
      });

    setAvailabilities(availabilitiesWithUserNames);
  }, [fetchUsers, fetchAvailabilities, fetchUserGroups, userId]);

  useEffect(() => {
    if (date) {
      fetchAvailabilitiesWithUserNames();
    }
  }, [date, fetchAvailabilitiesWithUserNames]);

  const groupNames = [...new Set(availabilities.flatMap((a) => a.groupNames))];

  return (
    <>
      <h2>Availability Matches</h2>
      {noGroup ? (
        <p>You need to join or create a group first.</p>
      ) : (
        <>
          <input type="date" value={date} onChange={handleDateChange} />
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                {groupNames.map((groupName, index) => (
                  <th key={index}>{groupName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {availabilities.map((availability, index) => (
                <tr key={index}>
                  <td>{availability.day}</td>
                  <td>{availability.userName}</td>
                  <td>{availability.userEmail}</td>
                  {groupNames.map((groupName, index) => (
                    <td key={index}>
                      {availability.groupNames.includes(groupName)
                        ? "Yes"
                        : "No"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default MatchingAvailabilities;
