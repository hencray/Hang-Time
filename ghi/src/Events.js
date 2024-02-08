import { Navbar } from "./Navbar";
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
  }, [token, navigate]); // dependencies

  return (
    <div>
      <Navbar />
      <h1>Event Detail</h1>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">HI</button>
      <button className="btn btn-error">Test</button>
      <div className="form-container">
        {token && <ListAttendees />}
        {token && <EventsTable />}
      </div>
    </div>
  );
};
