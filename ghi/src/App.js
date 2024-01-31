import { BrowserRouter } from "react-router-dom";
// import { useEffect, useState } from "react";
// import ErrorNotification from "./ErrorNotification";
import CreateUserForm from "./CreateAccount.js";
import LoginForm from "./Login.js";
import Logout from "./Logout.js";
import { AuthProvider } from "./Apiauth"; // Import AuthProvider
import "./App.css";

function App() {
  // const [launchInfo, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  const handleLogin = (user) => {
    // Handle login here
    console.log(user);
  };

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <div>
          {/* <ErrorNotification error={error} /> */}
          <CreateUserForm />
          <LoginForm onLogin={handleLogin} />
          <Logout onLogout={() => console.log("Logged out")} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
