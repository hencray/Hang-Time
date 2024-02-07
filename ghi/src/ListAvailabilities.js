import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";

const ListAvailabilities = ({ refreshList }) => {
  const { token } = useToken();
  const [availabilities, setAvailabilities] = useState([]);
  const baseURL = process.env.REACT_APP_API_HOST;
  const userId = getUserId(token);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      const response = await fetch(`${baseURL}/availability/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAvailabilities(data);
      }
    };

    fetchAvailabilities();
  }, [token, baseURL, userId, refreshList]);

  return (
    <>
      <h1>Your Availabilities</h1>
      <table>
        <thead>
          <tr>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>
          {availabilities.map((availability) => (
            <tr key={availability.id}>
              <td>{availability.day}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListAvailabilities;
