import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

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
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label htmlFor="id" className="label">
              <span className="label-text">ID:</span>
            </label>
            <input
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Name:</span>
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label htmlFor="description" className="label">
              <span className="label-text">Description:</span>
            </label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label htmlFor="location" className="label">
              <span className="label-text">Location:</span>
            </label>
            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label htmlFor="startDate" className="label">
              <span className="label-text">Start Date:</span>
            </label>
            <input
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label htmlFor="endDate" className="label">
              <span className="label-text">End Date:</span>
            </label>
            <input
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label htmlFor="eventGroupId" className="label">
              <span className="label-text">Event Group ID:</span>
            </label>
            <input
              id="eventGroupId"
              value={eventGroupId}
              onChange={(e) => setEventGroupId(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Event
          </button>
        </form>
      </div>
    </>
  );
};

export default EventDetails;
