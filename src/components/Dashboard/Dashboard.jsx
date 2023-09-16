/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* Importing the required modules. */
import React, { useEffect, useState } from "react";
import {
  AddTasks,
  deleteTheTask,
  getTasks,
  updateTask,
} from "../../services/Api";
import Modals from "../Modals";
import Task from "../Task";
import { Tasks } from "../TaskLists/Tasks";
import { DashboardFunctions } from "./DashboardFunctions";
import {
  FilterTask,
  filterTask,
  getStatusList,
} from "../../services/TaskFilter";

const Dashboard = () => {
  const [status, setStatus] = useState("To Do");
  const [taskBackUp, setTaskBackUp] = useState([]);
  const [allTask, setAllTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [completeTask, setCompletedTask] = useState([]);
  const [IncompleteTask, setIncompletedTask] = useState([]);
  const [statusChanged, setStatusChanged] = useState(false);
  const [statues, setStatuses] = useState(getStatusList());

  /**
   * It updates the task in the database and then updates the state of the component.
   * @param id - id of the task
   * @param newtask - {
   */
  const updateTasks = async (id, newtask) => {
    console.log(id, newtask);
    await updateTask([id, newtask, "Soumyajit"]);

    setAllTasks((p) => {
      let arr = [...p];
      arr.forEach((data, i) => {
        if (data._id === id) {
          arr[i] = {
            ...data,
            ...newtask,
          };
        }
      });
      arr.sort((a, b) => (b.taskStatus > a.taskStatus ? 1 : -1));
      return arr;
    });
    getAllTasks();
  };

  /**
   * It gets all the tasks from the database and sets the state of the taskList to the array of tasks.
   */
  const getAllTasks = async () => {
    let arr = [];
    getTasks().then((data) => {
      setTaskBackUp((prev) => data["data"]);
      let filteredData = filterTask(data["data"], status);
      // console.log(filteredData);
      setTaskList((prev) => filteredData);
    });
  };
  /**
   * If the task is deleted, then remove it from the task list.
   * @param object - {taskObj: {_id: "5e9f8f8f8f8f8f8f8f8f8f8f", title: "Task 1", description: "Task 1
   * description", status: "pending"}, indexNo: 0}
   */
  const deleteTask = async (object) => {
    setAllTasks((p) => {
      let arr = [...p];
      arr = arr.filter((x) => {
        return x._id !== object._id;
      });
      return arr;
    });
    setTaskList((p) => {
      let arr = [...p];
      arr = arr.filter((x) => {
        return x._id !== object._id;
      });
      return arr;
    });
    setCompletedTask((p) => {
      let arr = [...p];
      arr = arr.filter((x) => {
        return x._id !== object._id;
      });
      return arr;
    });
    await deleteTheTask([object._id]);
  };
  /**
   * It takes a task object and a user ID, and then it adds the task to the database.
   * @param taskObj - {
   * @param userID - the user's ID
   */
  const addTaskToDatabase = async (taskObj, userID) => {
    setTaskBackUp((prev) => [...prev, taskObj]);
    await AddTasks([taskObj, userID]);
    getAllTasks();
  };
  /* An array of objects. Each object has three properties. */
  const colors = [
    {
      primaryColorContainer: "#A3E4D7",
      primaryColor: "#16A085",
    },
    {
      primaryColorContainer: "#F9E79F",
      primaryColor: "#F5B041",
    },
    {
      primaryColorContainer: "#D7BDE2",
      primaryColor: "#8E44AD",
    },
    {
      primaryColorContainer: "#F5B7B1",
      primaryColor: "#E74C3C",
    },
    {
      primaryColorContainer: "#85C1E9",
      primaryColor: "#2471A3",
    },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  /* This is a React Hook that is called when the component is mounted. */

  useEffect(() => {
    if (taskBackUp?.length > 0) {
      let filtertedTasks = filterTask(taskBackUp, status);
      setTaskList((prev) => filtertedTasks);
      setStatusChanged((prev) => true);
    } else {
      setTimeout(() => {
        getAllTasks();
      }, 1000);
    }
  }, [status]);

  /**
   * It takes a new task as an argument and then calls the addTaskToDatabase function with the new task
   * and the name of the user.
   * @param newTask - The task that you want to add to the database.
   */
  const saveTasks = (newTask) => {
    addTaskToDatabase(newTask, "Soumyajit");
  };
  /**
   * It takes an id as an argument and calls the deleteTask function with that id as an argument.
   * @param id - the id of the task to be deleted
   */
  const handleDeleteEvent = (id) => {
    deleteTask(id);
  };

  const handleEditEvent = (id, newTask) => {
    updateTasks(id, newTask);
  };

  /* Returning the JSX code. */
  return (
    <div className="h-screen bg-gray-100">
      <div className="tasks">
        <Modals toggle={toggle} modal={modal} saveTask={saveTasks} />
      </div>
      <div className="data-container">
        <DashboardFunctions
          filterOption={statues}
          modal={setModal}
          selectStatus={setStatus}
        />
        <div className="container-tasks-main w-full p-5">
          <div className="task-container w-full f-full gap-y-72 flex flex-col items-center justify-between">
            <Tasks
              tasks={taskList}
              colors={colors}
              deleteTask={handleDeleteEvent}
              handleEditEvent={handleEditEvent}
              firstTime={statusChanged}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
