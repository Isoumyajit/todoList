import React, { useEffect, useState } from "react";
// import { faPlus } from "fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modals from "../Modals";
export const DashboardFunctions = ({ filterOption, modal }) => {
  const [filterState, setFilterState] = useState("");
  const [selectedButton, setSelectedButton] = useState(0);

  const handleClick = (buttonIndex) => {
    setSelectedButton((prev) => buttonIndex);
  };
  return (
    <div className="dashboard-header">
      <div className="tasks">{/* <Modals /> */}</div>
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
