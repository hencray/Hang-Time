import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const CreateEventForm = ({ setListEvents }) => {
  const { token } = useToken();
  const [user_id, setUserId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [group_id, setGroupId] = useState("");
  const [isEventCreated, setIsEventCreated] = useState(false);

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
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

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
        }
      }
    };

    fetchGroups();
  }, [user_id, token, isEventCreated]);

  if (groups.length === 0) {
    return (
      <div className="shadow p-4 mt-4">
        <h1>No Events Created or joined </h1>
        <p>Please join or create an event.</p>
      </div>
    );
  }

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

      const url = `${process.env.REACT_APP_API_HOST}/events`;
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
        setName("");
        setDescription("");
        setLocation("");
        setStartDate("");
        setEndDate("");
        setGroupId("");
        setIsEventCreated(true);
        const newEvent = await response.json();
        setListEvents((prevEvents) => [...prevEvents, newEvent]); 
      } else {
        console.error("Error creating event:", response);
      }
    };

    return (
      <>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
          <h1 className="mt-6 text-4xl font-bold leading-10 tracking-tight text-secondary md:text-4xl">
            Create An Event
          </h1>
          <form onSubmit={(e) => handleSubmit(e)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description:</span>
              </label>
              <input
                name="description"
                type="text"
                className="input input-bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location:</span>
              </label>
              <input
                name="location"
                type="text"
                className="input input-bordered"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Start Date:</span>
              </label>
              <input
                name="start_date"
                type="date"
                className="input input-bordered"
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">End Date:</span>
              </label>
              <input
                name="end_date"
                type="date"
                className="input input-bordered"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Group:</span>
              </label>
              <select
                name="group_id"
                className="select select-bordered"
                value={group_id}
                onChange={(e) => setGroupId(e.target.value)}
              >
                <option value="">Select a group</option>
                {groups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </>
    );
  };

export default CreateEventForm;
