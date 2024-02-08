import useToken from "@galvanize-inc/jwtdown-for-react";
import ListUsersGroupsEvents from "./ListUsersGroupsEvents";
import CreateEventForm from "./CreateEventForm";
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
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {token && (
          <div style={{ flex: "0 0 33%" }}>
            <CreateEventForm />
          </div>
        )}
        {token && (
          <div style={{ flex: "0 0 66%" }}>
            <ListUsersGroupsEvents />
          </div>
        )}
        {token && (
          <div style={{ flex: "0 0 50%" }}>
            <ManageGroups />
          </div>
        )}
        {token && (
          <div style={{ flex: "0 0 50%" }}>
            <AddFriend />
          </div>
        )}
      </div>
    </>
  );
};
