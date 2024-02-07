// import React, { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   const baseURL = process.env.REACT_APP_API_HOST;

//   const login = async (email, password) => {
//     const formData = new URLSearchParams();
//     formData.append("username", email); // 'username' here is actually the email
//     formData.append("password", password);

//     try {
//       const response = await fetch(`${baseURL}/token`, {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: formData,
//         credentials: "include",
//       });
//       console.log(response);

//       if (!response.ok) {
//         let errorData;
//         if (response.headers.get("Content-Type").includes("application/json")) {
//           errorData = await response.json();
//         } else {
//           errorData = await response.text();
//         }
//         console.log("Error data:", errorData);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Data received:", data);
//       setToken(data.access_token);

//       // Parse the token to get the user data
//       const base64Url = data.access_token.split(".")[1];
//       const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//       const jsonData = JSON.parse(window.atob(base64));

//       console.log(jsonData); // Log jsonData to the console

//       setUser(jsonData.account);

//       // Return the access_token
//       return data.access_token;
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const logout = async () => {
//     const response = await fetch(`${baseURL}/token`, {
//       method: "DELETE",
//       credentials: "include",
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.log("Error data:", errorData);
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
