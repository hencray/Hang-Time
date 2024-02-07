import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";

function AddFriend() {
  const { token } = useToken();
  const userId = getUserId(token);
  const baseURL = process.env.REACT_APP_API_HOST;
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${baseURL}/usergroups/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
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
  }, [token, baseURL, userId]);

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
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        setMessage("Friend successfully added to group!");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
  <div>
    <h1>Add Friends to Your Groups</h1>
    {Array.isArray(groups) && groups.length > 0 ? (
      <>
        <select value={selectedGroup} onChange={handleGroupChange}>
          {groups.map((group) => (
            <option key={group.group_id} value={group.group_id}>
              {group.group_id} - {group.name} - {group.description}
            </option>
          ))}
        </select>
        <input
          type="email"
          value={friendEmail}
          onChange={handleEmailChange}
          placeholder="Friend's email"
        />
        <button onClick={handleAddFriend}>Add Friend</button>
      </>
    ) : (
      <p>Please join a group first.</p>
    )}
    {message && <p>{message}</p>}
  </div>
);
}

export default AddFriend;
