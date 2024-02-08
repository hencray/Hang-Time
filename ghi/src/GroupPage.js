import useToken from "@galvanize-inc/jwtdown-for-react";
import ListUsersGroupsEvents from "./ListUsersGroupsEvents";
import CreateEventForm from "./CreateEventForm";
import MatchingAvailabilities from "./MatchingAvailabilities";
import ManageGroups from "./ManageUserGroups";
import AddFriend from "./AddFriend";
import { useNavigate } from "react-router-dom";
import "./App.css";

export const GroupPage = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <div className="App">
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
