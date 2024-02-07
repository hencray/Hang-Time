import React, { useState, useEffect } from "react";
import getUserId from "./GetUserId";
import useToken from "@galvanize-inc/jwtdown-for-react";

function AddUser({ onRefreshGroups, userGroups = [] }) {
  const { token } = useToken();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
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
      alert("Please select a group");
      return;
    }

    if (userGroups.some((group) => group.group_id === selectedGroup)) {
      alert("You are already in this group");
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
        console.error("Failed to add user to group.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to add user to group. Please try again later.");
    }
  };

  
  const filteredGroups = groups.filter((group) => {
    return !userGroups.some((userGroup) => userGroup.group_id === group.id);
  });

  return (
    <div className="shadow p-4 mt-4">
      <h1>Join a Group</h1>
      <select onChange={(e) => setSelectedGroup(e.target.value)}>
        <option value="">Select a group</option>
        {filteredGroups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.id} - {group.name} - {group.description}
          </option>
        ))}
      </select>
      <button onClick={handleAddUser}>Join Group</button>
    </div>
  );
}

export default AddUser;
