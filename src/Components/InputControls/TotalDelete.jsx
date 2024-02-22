import React from "react";

const TotalDelete = ({ deleteAllMeals }) => {
  return (
    <div className="app__controls__delete">
      <button className="btn__delete__all" onClick={() => deleteAllMeals()}>
        Delete All
      </button>
    </div>
  );
};

export default TotalDelete;
