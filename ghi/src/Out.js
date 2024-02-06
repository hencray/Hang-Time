import useToken from "@galvanize-inc/jwtdown-for-react";
// import { useNavigate } from "react-router-dom";

const TitleBar = () => {
  const { logout } = useToken();
  // const navigate = useNavigate();
  // const handleClick = () => navigate("/signup");

  // const gitlabLink = () => {
  //   window.location.href =
  //     "https://gitlab.com/sjp19-public-resources/authentication-playground";
  //   return null;
  // };

  // const feDocsLink = () => {
  //   window.location.href = "https://jwtdown-for-react.readthedocs.io";
  //   return null;
  // };

  // const beDocsLink = () => {
  //   window.location.href = "https://jwtdown-fastapi.readthedocs.io";
  //   return null;
  // };

  return (
    <div className="mt-3">
      <span className="d-flex">
        <h1 className="flex-fill">LogOut</h1>
        <div className="btn-toolbar" role="toolbar">
          <div className="btn-group me-2 mb-3" role="group"></div>

          <div className="btn-group mb-3" role="group">
            <button className="btn btn-danger" onClick={logout}>
              Logout <i className="bi bi-box-arrow-left"></i>
            </button>
          </div>
        </div>
      </span>
    </div>
  );
};

export default TitleBar;
