import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";
import AddUser from "./AddUser";
import AddFriend from "./AddFriend";

function UserGroups({ token, refreshFlag }) {
  const [usergroups, setGroups] = useState([]);
  const [message, setMessage] = useState("");
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
          setGroups(usergroupsWithCorrectGroupId || []);
        }
      }
    };
    fetchData();
  }, [token, userId, baseURL, refreshFlag, usergroups]);

  const handleLeaveGroup = async (groupId) => {
    const response = await fetch(`${baseURL}/usergroups/${userId}/${groupId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      setMessage("Successfully left group.");
      setGroups(usergroups.filter((group) => group.group_id !== groupId));
      refreshFlag();
    } else {
      setMessage("Failed to leave group.");
    }
    setTimeout(() => setMessage(""), 2000);
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
      setMessage("No joined groups, please join a group.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="shadow p-4 mt-4 flex flex-col items-center">
      <h1 className="text-center text-2xl font-bold leading-10 tracking-tight text-secondary md:text-2xl mb-4">
        Your Groups
      </h1>
      {message && <p className="text-center font-bold">{message}</p>}
      <table className="shadow-md rounded-lg w-full">
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
                  <button
                    className="btn btn-primary rounded"
                    onClick={() => handleLeaveAndRefresh(group.group_id)}
                  >
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
  const userId = getUserId(token);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
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
      const allGroupsResponse = await fetch(`${baseURL}/groups`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (allGroupsResponse.ok) {
        const allGroups = await allGroupsResponse.json();
        const newGroup = allGroups.find(
          (group) => group.name === name && group.description === description
        );
        if (newGroup) {
          const addUserResponse = await fetch(`${baseURL}/usergroups`, {
            method: "POST",
            body: JSON.stringify({ user_id: userId, group_id: newGroup.id }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (addUserResponse.ok) {
            setMessage("Group created and joined successfully!");
          } else {
            setMessage("Group created, but failed to join. Please try again.");
          }
        } else {
          setMessage("Group created, but failed to find it. Please try again.");
        }
      } else {
        setMessage(
          "Group created, but failed to fetch groups. Please try again."
        );
      }
      setName("");
      setDescription("");
      onRefreshGroups();
    } else {
      setMessage(
        "Failed to create group. Please check the form data and try again."
      );
    }
    setTimeout(() => setMessage(""), 2000);
  };

 return (
   <div className="shadow p-4 mt-4 flex flex-col items-center">
     <h1 className="text-center text-2xl font-bold leading-10 tracking-tight text-secondary md:text-2xl">
       Create a Group
     </h1>
     {message && <p className="text-center font-bold">{message}</p>}
     <form onSubmit={handleSubmit} id="create-group-form" className="w-full">
       <div className="form-floating mb-3">
         <input
           onChange={(e) => setName(e.target.value)}
           placeholder="Name"
           required
           type="text"
           name="name"
           value={name}
           id="name"
           className="form-control border-2 border-gray-200 p-2 w-full h-10"
         />
         <label
           htmlFor="name"
           className="text-center font-bold leading-10 tracking-tight text-secondary"
         >
           Name
         </label>
       </div>
       <div className="form-floating mb-3">
         <textarea
           onChange={(e) => setDescription(e.target.value)}
           placeholder="Description"
           required
           name="description"
           value={description}
           id="description"
           className="form-control border-2 border-gray-200 p-2 w-full h-36"
         />
         <label
           htmlFor="name"
           className="text-center font-bold leading-10 tracking-tight text-secondary"
         >
           Description
         </label>
       </div>
       <button className="btn btn-primary rounded">Create</button>
     </form>
   </div>
 );
}

function ManageGroups() {
  const { token } = useToken();
  const userId = getUserId(token);
  const baseURL = process.env.REACT_APP_API_HOST;
  const [userGroups, setUserGroups] = useState([]);
  const [, setRefreshFlag] = useState(0);

  useEffect(() => {
    fetch(`${baseURL}/usergroups/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserGroups(data))
      .catch((error) => console.error("There was an error!", error));
  }, [token, baseURL, userId, setRefreshFlag]);

  const refreshGroups = () => {
    fetch(`${baseURL}/usergroups/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserGroups(data))
      .catch((error) => console.error("There was an error!", error));
    setRefreshFlag((prevFlag) => prevFlag + 1);
  };

  return (
    <div className="flex w-full justify-between">
      <div className="w-1/2">
        <div className="shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
          <CreateGroupForm onRefreshGroups={refreshGroups} />
        </div>
        <div className="flex">
          <button
            className="btn btn-primary ml-auto"
            onClick={() =>
              document.getElementById("userGroupsModal").showModal()
            }
          >
            Click for Your Groups
          </button>
        </div>
        <dialog id="userGroupsModal" className="p-4 rounded-lg shadow-lg">
          <UserGroups
            token={token}
            refreshFlag={refreshGroups}
            userGroups={userGroups}
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => document.getElementById("userGroupsModal").close()}
          >
            Close
          </button>
        </dialog>
      </div>
      <div className="w-1/2">
        <div className="shadow-lg rounded-lg p-4 border border-gray-200 space-y-4">
          <AddUser onRefreshGroups={refreshGroups} userGroups={userGroups} />
          <div className="ml-4">
            <AddFriend
              userGroups={userGroups}
              onRefreshGroups={refreshGroups}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageGroups;
//const [State setState] = useState ([])
//setState((preve)=>{[...preve,foo]})
