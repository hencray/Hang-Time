import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Login.js";
import Logout from "./Logout.js";
import { AuthProvider, useAuth } from "./Apiauth";
import CreateAvailability from "./CreateAvailability";
import "./App.css";
import LoginForm from "./LoginForm";
import { Main } from "./Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { user, login, logout } = useAuth();
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  const handleLogin = (data) => {
    login(data.user, data.access_token);
  };

  const handleLogout = async () => {
    await logout();
    console.log("Logged out");
  };

  const baseURL = process.env.REACT_APP_API_HOST;
  return (
    <BrowserRouter basename={basename}>
      <div>
        <Routes>
          {user && (
            <Route path="/availability" element={<CreateAvailability />} />
          )}
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        </Routes>
        <Logout onLogout={handleLogout} />
      </div>
    </BrowserRouter>
  );
}

function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Root;
