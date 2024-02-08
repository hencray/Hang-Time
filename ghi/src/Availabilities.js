import React from "react";
import ListAvailabilities from "./ListAvailabilities";
import MatchingAvailabilities from "./MatchingAvailabilities";

const Availabilities = () => {
  return (
    <div className="table-container">
      <ListAvailabilities />
      <MatchingAvailabilities />
    </div>
  );
};

export default Availabilities;
