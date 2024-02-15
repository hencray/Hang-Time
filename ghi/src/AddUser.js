import React, { useState, useEffect } from "react";
import getUserId from "./GetUserId";
import useToken from "@galvanize-inc/jwtdown-for-react";

function AddUser({ onRefreshGroups, userGroups = [] }) {
  const { token } = useToken();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [message, setMessage] = useState("");
  const userId = getUserId(token);
  const baseURL = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}/groups`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setGroups(data);
      }
    };
    fetchData();
  }, [token, baseURL]);

  const handleAddUser = async () => {
    if (!selectedGroup) {
      setMessage("Please select a group");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    const userGroupsArray = Array.isArray(userGroups) ? userGroups : [];
    if (userGroupsArray.some((group) => group.group_id === selectedGroup)) {
      setMessage("You are already in this group");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      const response = await fetch(`${baseURL}/usergroups`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, group_id: selectedGroup }),
      });

      if (response.ok) {
        onRefreshGroups();
      } else {
        setMessage("Failed to add user to group. Please try again later.");
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (error) {
      setMessage("User is already in this group");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const filteredGroups = (Array.isArray(groups) ? groups : []).filter(
    (group) => {
      const userGroupsArray = Array.isArray(userGroups) ? userGroups : [];
      return !userGroupsArray.some(
        (userGroup) => userGroup.group_id === group.id
      );
    }
  );

  return (
    <div className="shadow p-4 mt-4 flex flex-col items-center">
      <h1 className="text-center text-2xl font-bold leading-10 tracking-tight text-secondary md:text-2xl">
        Join a Group
      </h1>
      {message && <p className="text-center font-bold">{message}</p>}
      <select
        className="mb-4"
        onChange={(e) => setSelectedGroup(e.target.value)}
      >
        <option value="">Select a group</option>
        {filteredGroups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.id} - {group.name} - {group.description}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" onClick={handleAddUser}>
        Join Group
      </button>
    </div>
  );
}

export default AddUser;
