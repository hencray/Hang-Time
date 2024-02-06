import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import { Main } from "./Main";
import { BrowserRouter } from "react-router-dom";

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
        <div>
          <Main/>
        </div>
        <div>
          <ErrorNotification error={error} />
          <p> hello</p>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
