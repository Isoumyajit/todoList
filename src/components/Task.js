import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import Modals from "./Modals";

const Task = ({ task, indexNo, colors, deleteTask, handleEditEvent }) => {
  const [editmodal, seteditModal] = useState(false);
  console.log(task, indexNo, colors);
  const toggle = () => {
    seteditModal(!editmodal);
  };
  return (
    <>
      <div
        className="task-object w-1/2 bg-gray-100 shadow-sm rounded-md p-2 flex flex-row justify-between"
        style={{
          border: "2px solid" + colors[indexNo % 5].primaryColor,
          borderLeft: "5px solid" + colors[indexNo % 5].primaryColor,
          backgroundColor:
            task.taskStatus === "Completed"
              ? "#4f5b62"
              : colors[indexNo % 5].primaryColorContainer,
          textDecoration:
            task.taskStatus === "Completed" ? "line-through" : "none",
          filter: task.taskStatus === "Completed" ? "blur(0.2px)" : "blur(0)",
        }}
      >
        {task.taskStatus === "Completed" ? (
          <div className="green-tick">
            <FontAwesomeIcon
              icon={faCheckDouble}
              size="lg"
              style={{ color: "#00B8A3", padding: "5px !important" }}
            />
            <div className="completeMessageDivStyle">
              <label style={{ color: "#fff" }}> Completed</label>{" "}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className=" task-body m-2 rounded-md">
          <div className="task-heading">
            <span className="card-header text-lg font-semibold">
              {task.taskName}
            </span>
          </div>
        </div>
        <div className="functional-btn flex gap-2 items-center">
          <button
            type="button"
            className="bg-white p-2 shadow-md hover:scale-105 duration-200 rounded-md"
            onClick={() => seteditModal(true)}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            type="button"
            className="bg-white p-2 shadow-md hover:scale-105 duration-200 rounded-md"
            onClick={() => deleteTask(task)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
      <Modals
        editModal={editmodal}
        editToggle={toggle}
        index={indexNo}
        taskObj={task}
        editEvent={handleEditEvent}
      />
    </>
  );
};

export default Task;
