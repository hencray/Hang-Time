import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import ListAttendees from "./ListAttendees";
import EventsTable from "./EventHistory";
import { useEffect } from "react";

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
      <h1>Event Detail</h1>
      <div className="form-container">
        {token && <ListAttendees />}
        {token && <EventsTable />}
      </div>
    </div>
  );
};
