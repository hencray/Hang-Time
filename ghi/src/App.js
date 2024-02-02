import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import LoginForm from "./LoginForm";
import { Main } from "./Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [error, setError] = useState(null);

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
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
      <BrowserRouter basename={basename}>
        {/* <AuthProvider> */}
        <div>
          <ErrorNotification error={error} />
          <p> hello</p>
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route exact path="/login" element={<LoginForm />}></Route>
          </Routes>
        </div>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
