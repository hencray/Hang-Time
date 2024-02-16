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
    const response = await fetch(`${baseURL}/availability/past`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error deleting past availabilities: ${errorData.detail}`);
    }

    handleRefreshList();
  }, [baseURL, token]);

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

      setTimeout(() => {
        setMessage("");
      }, 2000);

      handleRefreshList();
    } else {
      const errorData = await response.json();
      setMessage(`Error creating availability: ${errorData.detail}`);

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h2 className="text-center text-2xl font-bold leading-10 tracking-tight text-secondary md:text-2xl">
          Create Availabilities
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span>Day:</span>
            </div>
            <input
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <button type="submit" className="btn btn-primary mt-4 font-bold">
            Create
          </button>
        </form>
        {message && <p className="text-center font-bold">{message}</p>}
        <div className="flex space-x-40">
          <div className="w-1/2 mt-10">
            <ListAvailabilities
              refreshList={refreshList}
              onRefresh={handleRefreshList}
            />
          </div>
          <div className="w-1/2 mt-11">
            <MatchingAvailabilities />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAvailability;
