import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";
import AddUser from "./AddUser";
import AddFriend from "./AddFriend";


function refreshPage() {
    window.location.reload(false);
  }

function UserGroups({ token, refreshFlag }) {
  const [usergroups, setGroups] = useState([]);
  const userId = getUserId(token);
  const baseURL = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const response = await fetch(`${baseURL}/usergroups/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          const usergroupsWithCorrectGroupId = data.map((group) => ({
            ...group,
            group_id: group.group_id,
          }));
          setGroups(usergroupsWithCorrectGroupId);
        }
      }
    };
    fetchData();
  }, [token, userId, baseURL, refreshFlag]);

  const handleLeaveGroup = async (groupId) => {
    const response = await fetch(`${baseURL}/usergroups/${userId}/${groupId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      refreshFlag();
      refreshPage();
    } else {
      console.error("Failed to leave group.");
    }
  };

  if (usergroups && usergroups.length === 0) {
    return (
      <div className="shadow p-4 mt-4">
        <h1>No Groups Found</h1>
        <p>Please join or create a group.</p>
      </div>
    );
  }

  const handleLeaveAndRefresh = (groupId) => {
    handleLeaveGroup(groupId);
    if (usergroups.length === 1) {
      alert("No joined groups, please join a group.");
    }
  };

  return (
    <div className="shadow p-4 mt-4">
      <h1>Your Groups</h1>
      <table>
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usergroups &&
            usergroups.map((group) => (
              <tr key={group.group_id}>
                <td>{group.group_id}</td>
                <td>{group.name}</td>
                <td>{group.description}</td>
                <td>
                  <button onClick={() => handleLeaveAndRefresh(group.group_id)}>
                    Leave Group
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}


function CreateGroupForm({ onRefreshGroups }) {
  const { token } = useToken();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const baseURL = process.env.REACT_APP_API_HOST;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
      description,
    };
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${baseURL}/groups`, fetchConfig);
    if (response.ok) {
      setName("");
      setDescription("");
      onRefreshGroups();
      refreshPage();
    } else {
      console.error("Failed to create group.");
      alert("Failed to create group. Please try again.");
    }
  };

  return (
    <div className="shadow p-4 mt-4">
      <h1>Create a Group</h1>
      <form onSubmit={handleSubmit} id="create-group-form">
        <div className="form-floating mb-3">
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            type="text"
            name="name"
            value={name}
            id="name"
            className="form-control"
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            name="description"
            value={description}
            id="description"
            className="form-control"
          />
          <label htmlFor="description">Description</label>
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}


function ManageGroups() {
  const { token } = useToken();
  const [, setRefreshFlag] = useState(0);
  const refreshGroups = async () => {
    setRefreshFlag((prevFlag) => prevFlag + 1);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <UserGroups token={token} refreshFlag={refreshGroups} />
        <AddUser onRefreshGroups={refreshGroups} />
        <CreateGroupForm onRefreshGroups={refreshGroups} />
        <AddFriend onRefreshGroups={refreshGroups} />
      </div>
    </div>
  );
}

export default ManageGroups;
