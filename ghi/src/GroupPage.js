import useToken from "@galvanize-inc/jwtdown-for-react";
import ManageGroups from "./ManageUserGroups";
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
      <div className="flex justify-center items-center flex-wrap">
        {token && (
          <div className="w-1/2">
            <ManageGroups />
          </div>
        )}
      </div>
    </>
  );
};
