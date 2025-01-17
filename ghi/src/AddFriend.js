import React, { useState, useEffect, useRef } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";

function AddFriend({ userGroups = [], onRefreshGroups }) {
  const { token } = useToken();
  const userId = getUserId(token);
  const baseURL = process.env.REACT_APP_API_HOST;
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [message, setMessage] = useState("");

  const prevUserGroupsRef = useRef();
  const prevUserGroups = prevUserGroupsRef.current;

  useEffect(() => {
    if (JSON.stringify(userGroups) === JSON.stringify(prevUserGroups)) {
      return;
    }

    fetch(`${baseURL}/usergroups/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setGroups(data))
      .catch((error) => console.error("There was an error!", error));

    fetch(`${baseURL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("There was an error!", error));

    prevUserGroupsRef.current = userGroups;
  }, [token, baseURL, userId, userGroups, prevUserGroups]);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleEmailChange = (event) => {
    setFriendEmail(event.target.value);
  };

  const handleAddFriend = () => {
    const friend = users.find((user) => user.email === friendEmail);
    if (!friend) {
      setMessage("No user found with this email!");
      return;
    }

    fetch(`${baseURL}/usergroups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: friend.id,
        group_id: selectedGroup,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        return response.json();
      })
      .then(() => {
        setMessage("Friend successfully added to group!");
        onRefreshGroups();
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl font-bold leading-10 tracking-tight text-secondary md:text-2xl">
        Add Friends to Your Groups
      </h1>
      {Array.isArray(groups) && groups.length > 0 ? (
        <>
          <select
            className="mb-4"
            value={selectedGroup}
            onChange={handleGroupChange}
          >
            {groups.map((group) => (
              <option key={group.group_id} value={group.group_id}>
                {group.group_id} - {group.name} - {group.description}
              </option>
            ))}
          </select>
          <input
            className="border-2 border-gray-200 p-2 w-full mb-4"
            type="email"
            value={friendEmail}
            onChange={handleEmailChange}
            placeholder="Friend's email"
          />
          <button className="btn btn-primary" onClick={handleAddFriend}>Add Friend</button>
        </>
      ) : (
        <p>Please join a group first.</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddFriend;
