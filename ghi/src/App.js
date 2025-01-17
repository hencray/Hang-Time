import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import { Main } from "./Main";
import { ProfilePage } from "./ProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GroupPage } from "./GroupPage";
import { Events } from "./Events";
import TitleBar from "./Out";
import EventDetails from "./EventDetails";
import LoginForm from "./LoginForm";
import { Navbar } from "./Navbar";
import SignupForm from "./SignUpForm";

function App() {
  const [error, setError] = useState(null);
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      let response = await fetch(url);
      let data = await response.json();
      if (response.ok) {
        console.log("got launch data!");
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);
  const baseURL = process.env.REACT_APP_API_HOST;
  return (
    <AuthProvider baseUrl={baseURL}>
      <Router basename={basename}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/Out" element={<TitleBar />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:event_id" element={<EventDetails />} />{" "}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
        <div>
          <ErrorNotification error={error} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
