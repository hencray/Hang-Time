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
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-center text-4xl text-black font-bold">
        Availability Matches
      </h2>
      {noGroup ? (
        <p className="text-black font-bold">
          You need to join or create a group first.
        </p>
      ) : (
        <>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="input input-bordered w-full max-w-xs text-black font-bold"
          />
          <div className="overflow-x-auto">
            <table className="table table-zebra border rounded m-auto mt-4">
              <thead>
                <tr>
                  <th className="text-center text-black ">Date</th>
                  <th className="text-center text-black ">Name</th>
                  <th className="text-center text-black ">Email</th>
                  {groupNames.map((groupName, index) => (
                    <th key={index} className="text-center text-black">
                      {groupName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {availabilities.map((availability, index) => (
                  <tr key={index}>
                    <td className="text-black ">{availability.day}</td>
                    <td className="text-black ">{availability.userName}</td>
                    <td className="text-black ">{availability.userEmail}</td>
                    {groupNames.map((groupName, index) => (
                      <td key={index} className="text-black ">
                        {availability.groupNames.includes(groupName)
                          ? "Yes"
                          : "No"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MatchingAvailabilities;
