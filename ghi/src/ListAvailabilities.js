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
    <div className="overflow-x-auto">
      <h1 className="text-center mt-6 text-4xl font-bold leading-10 tracking-tight text-secondary md:text-4xl mb-20">
        Your Availabilities
      </h1>
      <table className="table table-zebra border rounded">
        <thead>
          <tr>
            <th>Day</th>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>
          {availabilities
            .reduce((resultArray, item, index) => {
              const chunkIndex = Math.floor(index / 2);

              if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [];
              }

              resultArray[chunkIndex].push(item);

              return resultArray;
            }, [])
            .map((availabilityPair) => (
              <tr key={availabilityPair[0].id}>
                <td>{availabilityPair[0].day}</td>
                <td>{availabilityPair[1]?.day}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAvailabilities;
