import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modals from "./Modals";
import "../App.css";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const toggle = () => {
    setModal(false);
  };

  const saveTasks = (newTask) => {
    let taskObjectList = taskList;
    taskObjectList.push(newTask);
    setTaskList(taskObjectList);
    localStorage.setItem("tasksList", JSON.stringify(taskList));
  };

  return (
    <>
      <div className="upper-label text-center">
        <h3 className="subject-heading">Todo List</h3>
        <div className="create-task-button">
          <Button variant="primary" onClick={() => setModal(true)}>
            Create your Tasks
          </Button>
        </div>
      </div>
      <div className="tasks">
        <Modals toggle={toggle} modal={modal} saveTask={saveTasks} />
      </div>
      <div className="task-container">
        {taskList.map((obj) => (
          <li>{obj.Name}</li>
        ))}
      </div>
    </>
  );
};
export default TodoList;
