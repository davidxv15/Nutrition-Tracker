import React from "react";

const TotalCount = ({ total }) => {
  return (
    <div className="app__controls__counter">
      <h2>
        Total Calories: <span>{total}</span>
      </h2>
    </div>
  );
};

export default TotalCount;
