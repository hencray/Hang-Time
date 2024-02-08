import React, { useState, useEffect, useCallback } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import getUserId from "./GetUserId";
import ListAvailabilities from "./ListAvailabilities";
import MatchingAvailabilities from "./MatchingAvailabilities";

const CreateAvailability = () => {
  const { token } = useToken();
  const [day, setDay] = useState("");
  const [message, setMessage] = useState("");
  const baseURL = process.env.REACT_APP_API_HOST;
  const userId = getUserId(token);
  const [refreshList, setRefreshList] = useState(false);

  const handleRefreshList = () => {
    setRefreshList((prevRefresh) => !prevRefresh);
  };

  const deleteOldAvailabilities = useCallback(async () => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const response = await fetch(`${baseURL}/availability/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const availabilities = await response.json();

    for (let availability of availabilities) {
      const availabilityDate = new Date(availability.day);
      if (availabilityDate < sevenDaysAgo) {
        await fetch(`${baseURL}/availability/${availability.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    handleRefreshList();
  }, [baseURL, token, userId]);

  useEffect(() => {
    deleteOldAvailabilities();
  }, [deleteOldAvailabilities]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${baseURL}/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        day,
        is_match: true,
        user_id: Number(userId),
      }),
    });

    if (response.ok) {
      setMessage("Availability created successfully");


      handleRefreshList();
    } else {
      const errorData = await response.json();
      setMessage(`Error creating availability: ${errorData.detail}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen -mt-15">
      <div>
        <h2 className="text-center text-2xl text-black font-bold">
          Create Availabilities
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-black font-bold">Day:</span>
            </div>
            <input
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
              className="input input-bordered w-full max-w-xs text-black font-bold"
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary mt-4 text-black font-bold"
          >
            Create
          </button>
        </form>
        {message && (
          <p className="text-center text-black font-bold">{message}</p>
        )}
        <div className="flex space-x-40">
          <div className="w-1/2 mt-10">
            <ListAvailabilities
              refreshList={refreshList}
              onRefresh={handleRefreshList}
            />
          </div>
          <div className="flex space-x- w-1/2 mt-6 ">
            <MatchingAvailabilities />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAvailability;
