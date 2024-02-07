import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Navbar } from "./Navbar"; // Import the Navbar component

const EventDetails = () => {
  const { token } = useAuthContext();
  const { event_id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventGroupId, setEventGroupId] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/events/${event_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setEvent(data);
        console.log(data);
        setId(data.id);
        setName(data.name);
        setDescription(data.description);
        setLocation(data.location);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setEventGroupId(data.group_id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventDetails();
  }, [event_id, token]); // Include 'token' in the dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      id,
      name,
      description,
      location,
      start_date: startDate,
      end_date: endDate,
      group_id: eventGroupId,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/events/${event_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (response.ok) {
        navigate("/Group");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!event) return <div>Wait</div>;

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input id="id" value={id} onChange={(e) => setId(e.target.value)} />
        </div>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="eventGroupId">Event Group ID:</label>
          <input
            id="eventGroupId"
            value={eventGroupId}
            onChange={(e) => setEventGroupId(e.target.value)}
          />
        </div>

        <button type="submit">Update Event</button>
      </form>
    </>
  );
};

export default EventDetails;
