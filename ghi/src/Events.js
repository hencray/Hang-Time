import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import ListAttendees from "./ListAttendees";
import EventsTable from "./EventHistory";
import CreateEventForm from "./CreateEventForm";
import ListUsersGroupsEvents from "./ListUsersGroupsEvents";

export const Events = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const [show, setShow] = useState("");

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
        {token && show === "" && (
          <button className="btn btn-info" onClick={() => setShow("both")}>
            Create Event
          </button>
        )}
        {token && show === "both" && (
          <button className="btn btn-info" onClick={() => setShow("")}>
            Back
          </button>
        )}
      </div>
      <div className="flex justify-start items-start w-full">
        {token && (
          <div className="w-1/3">
            {show === "" && (
              <div className="mt-11">
                <ListAttendees />
              </div>
            )}
            {show === "both" && <CreateEventForm />}
          </div>
        )}
        {token && (
          <div className="w-2/3">
            {show === "" && <ListUsersGroupsEvents />}
            {show === "both" && <EventsTable />}
          </div>
        )}
      </div>
    </div>
  );
};
