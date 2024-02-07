import { Link, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ListUsersGroupsEvents from "./ListUsersGroupsEvents";
import CreateEventForm from "./CreateEventForm";
import MatchingAvailabilities from "./MatchingAvailabilities";
import ManageGroups from "./ManageUserGroups";
import AddFriend from "./AddFriend";
import "./App.css";



export const GroupPage = () => {
  const { token } = useToken();
  const location = useLocation();
  return (
    <div className="App">
      <div className="App-header">
        <nav>
          {token && location.pathname !== "/" && (
            <Link className="link-style" to="/">
              Home
            </Link>
          )}
          {token && location.pathname !== "/profile" && (
            <Link className="link-style" to="/profile">
              Profile
            </Link>
          )}
          {token && location.pathname !== "/Group" && (
            <Link className="link-style" to="/Group">
              Groups
            </Link>
          )}
        </nav>
        <h1 className="h1-center-top">Group</h1>
      </div>
      <div className="form-container">
        {token && <CreateEventForm />}
        {token && <ListUsersGroupsEvents />}
        {token && <MatchingAvailabilities />}
        {token && <ManageGroups />}
        {token && <AddFriend />}
      </div>
    </div>
  );
};
