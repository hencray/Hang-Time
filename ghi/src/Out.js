const TitleBar = () => {
  return (
    <div className="mt-3">
      <span className="d-flex">
        <h1 className="flex-fill">LogOut</h1>
        <div className="btn-toolbar" role="toolbar">
          <div className="btn-group me-2 mb-3" role="group"></div>

          <div className="btn-group mb-3" role="group">
            <button className="btn btn-danger">
              Logout <i className="bi bi-box-arrow-left"></i>
            </button>
          </div>
        </div>
      </span>
    </div>
  );
};

export default TitleBar;
