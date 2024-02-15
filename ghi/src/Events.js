import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import ListAttendees from "./ListAttendees";
import EventsTable from "./EventHistory";
import CreateEventForm from "./CreateEventForm";
import ListUsersGroupsEvents from "./ListUsersGroupsEvents";

export const Events = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold leading-10 tracking-tight text-secondary md:text-2xl">
        Events
      </h1>
      <div className="flex justify-center items-center space-x-4 w-full">
        {token && (
          <button
            className="btn btn-primary"
            onClick={() =>
              document.getElementById("createEventModal").showModal()
            }
          >
            Create Event
          </button>
        )}
        {token && (
          <button
            className="btn btn-primary"
            onClick={() =>
              document.getElementById("eventsTableModal").showModal()
            }
          >
            Show Events
          </button>
        )}
      </div>
      <div className="flex justify-start items-start w-full">
        {token && (
          <div className="w-1/3">
            <div className="mt-11">
              <ListAttendees />
            </div>
          </div>
        )}
        {token && (
          <div className="w-2/3">
            <ListUsersGroupsEvents />
          </div>
        )}
      </div>
      <dialog id="createEventModal" className="p-4 rounded-lg shadow-lg">
        <CreateEventForm />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => document.getElementById("createEventModal").close()}
        >
          Close
        </button>
      </dialog>
      <dialog id="eventsTableModal" className="p-4 rounded-lg shadow-lg">
        <EventsTable />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => document.getElementById("eventsTableModal").close()}
        >
          Close
        </button>
      </dialog>
    </div>
  );
};
