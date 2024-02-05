import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const CreateEventForm = () => {
  const { token } = useToken();
  const [user_id, setUserId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [group_id, setGroupId] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/token`;
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.user.id);
          console.log("User data fetched:", data.user.id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);
  console.log(user_id);
  useEffect(() => {
    const fetchGroups = async () => {
      if (user_id) {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/usergroups/${user_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.ok) {
          const data = await response.json();
          setGroups(data);
          console.log(data);
          console.log("Groups fetched:", data);
        }
      }
    };

    fetchGroups();
  }, [user_id, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventData = {
      name,
      description,
      location,
      start_date,
      end_date,
      group_id,
    };

    const url = "http://localhost:8000/events";
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      const data = await response.json();
      console.log("Event created:", data);
    } else {
      console.error("Error creating event:", response);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Start Date:
            <input
              type="date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            End Date:
            <input
              type="date"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Group:
            <select
              value={group_id}
              onChange={(e) => setGroupId(e.target.value)}
            >
              <option value="">Select a group</option>{" "}
              {/* Add default option */}
              {groups.map((group) => (
                <option key={group.group_id} value={group.group_id}>
                  {group.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
