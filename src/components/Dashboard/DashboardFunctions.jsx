import React, { useState, useEffect } from "react";
export const DashboardFunctions = ({ filterOption, modal, selectStatus }) => {
  const [selectedButton, setSelectedButton] = useState(0);
  useEffect(() => {
    selectStatus((prev) => filterOption[selectedButton]);
  }, [filterOption, selectStatus, selectedButton]);
  const handleClick = (buttonIndex) => {
    setSelectedButton((prev) => buttonIndex);
    console.log(filterOption[selectedButton]);
    selectStatus((prev) => filterOption[selectedButton]);
  };
  return (
    <div className="dashboard-header">
      <div className="tasks"></div>
      <div className="w-full bg-yellow-100 p-2 flex flex-row gap-4 items-center justify-center ">
        {filterOption.map((option, index) => (
          <div key={index}>
            <button
              type="button"
              className={
                "font-semibold items-center" +
                (index === selectedButton &&
                  " text-gray-600 text-lg font-bold border-b-4 border-b-gray-400")
              }
              onClick={() => handleClick(index)}
            >
              {" "}
              {option}
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-gray-300 pl-2 font-semibold  pr-2 pt-1 pb-1 hover:bg-gray-500 hover:text-white rounded-md hover:scale-105 duration-75 shadow-sm"
          onClick={() => modal(true)}
        >
          Add
        </button>
      </div>
    </div>
  );
};
