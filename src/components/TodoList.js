/* Importing the required modules. */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import "../App.css";
import { AddTasks, deleteTheTask, getTasks, updateTask } from "../services/Api";
import Modals from "./Modals";
import Task from "./Task";
import LoadingScreen from "./LoadingScreen";
// import Pagination from "./Pagination";

const TodoList = () => {
  const [status, setStatus] = React.useState("");
  const dropdownitems = ["All", "Completed", "Incomplete"];
  const [allTask, setAllTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [completeTask, setCompletedTask] = useState([]);
  const [IncompleteTask, setIncompletedTask] = useState([]);
  const [tasks, setTasks] = useState(taskList.slice(0, 50));
  const [pageNumber, setPageNumber] = useState(0);
  const tasksPerPage = 12;
  const pageVisited = pageNumber * tasksPerPage;

  /**
   * It updates the task in the database and then updates the state of the component.
   * @param id - id of the task
   * @param newtask - {
   */
  const updateTasks = async (id, newtask) => {
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
    setTaskList(allTask);
  };

  /**
   * It gets all the tasks from the database and sets the state of the taskList to the array of tasks.
   */
  const getAllTasks = async () => {
    setTaskList([]);
    let arr = [];
    arr = await getTasks();

    if (arr) {
      console.log(arr);
      setTaskList([...arr["data"]]);
      setAllTasks([...arr["data"]]);
    }
  };
  /**
   * If the task is deleted, then remove it from the task list.
   * @param object - {taskObj: {_id: "5e9f8f8f8f8f8f8f8f8f8f8f", title: "Task 1", description: "Task 1
   * description", status: "pending"}, indexNo: 0}
   */
  const deleteTask = async (object) => {
    if (deleteTheTask([object.taskObj._id])) {
      setTaskList((p) => {
        let arr = [...p];
        arr.splice(object.indexNo, 1);
        allTask.splice(object.indexNo, 1);
        completeTask.splice(object.indexNo, 1);
        IncompleteTask.splice(object.indexNo, 1);
        return arr;
      });
    }
  };
  /**
   * It takes a task object and a user ID, and then it adds the task to the database.
   * @param taskObj - {
   * @param userID - the user's ID
   */
  const addTaskToDatabase = async (taskObj, userID) => {
    await AddTasks([taskObj, userID]);
    getAllTasks();
  };
  /* An array of objects. Each object has three properties. */
  const colors = [
    {
      primaryColorContainer: "#9B59B6",
      primaryColor: "#5D93E1",
      secondaryColor: "#FFD600",
    },
    {
      primaryColorContainer: "#2ECC71",
      primaryColor: "#F9D288",
      secondaryColor: "#BDC3C7",
    },
    {
      primaryColorContainer: "#1ABC9C",
      primaryColor: "#5DC250",
      secondaryColor: "#E8F5E9",
    },
    {
      primaryColorContainer: "#FDA4AF",
      primaryColor: "#F48687",
      secondaryColor: "#FF8F00",
    },
    {
      primaryColorContainer: "#F1C40F",
      primaryColor: "#B964F7",
      secondaryColor: "#FFFC00",
    },
  ];

  const toggle = () => {
    setModal(!modal);
  };
  //  ** Using useEffect Hook to manage side-funtionalities like fetching values from localstorage
  //  ** There is two parameters one is
  // !callBack function
  // !Optional Array -- manage that this will run only once

  /* This is a React Hook that is called when the component is mounted. */
  useEffect(() => {
    getAllTasks();
    setStatus("All");
  }, []);

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
    console.log(taskList);
  };

  /* Filtering the tasks based on the status. */
  useEffect(() => {
    const showSelectedTasks = (target) => {
      let arr = [];
      allTask.forEach((task) => {
        if (task["taskStatus"]) {
          if (task["taskStatus"] === target) {
            arr.push(task);
          }
        }
      });
      if (target === "Completed") {
        setTaskList(arr);
        setCompletedTask(arr);
      } else if (target === "Incomplete") {
        setTaskList(arr);
        setIncompletedTask(arr);
      } else {
        setTaskList(allTask);
      }
    };
    showSelectedTasks(status);
  }, [allTask, status]);

  const handleChangeDropwDown = (event) => {
    setStatus(event.target.value);
  };

  const paginateTask = (taskLists) => {
    console.log(taskLists);
    taskLists.map((obj, index) => {
      <Task
        key={obj._id}
        taskObj={obj}
        indexNo={index}
        colors={colors}
        deleteTask={handleDeleteEvent}
        handleEditEvent={handleEditEvent}
      />;
    });
  };
  /* Returning the JSX code. */
  return (
    <>
      <div className="upper-label">
        <div className="upper-section text-center">
          <FontAwesomeIcon
            type="button"
            icon={faPlus}
            size="lg"
            onClick={() => setModal(true)}
          />
        </div>
        <div className="filtrationOption">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-autowidth"
              value={status}
              label="Status"
              onChange={handleChangeDropwDown}
            >
              {dropdownitems.map((st) => (
                <MenuItem value={st}>{st}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="data-container">
        <div className="tasks">
          <Modals toggle={toggle} modal={modal} saveTask={saveTasks} />
        </div>
        <div className="container-tasks-main">
          <div className="task-container">
            {taskList.length < 1 ? <LoadingScreen /> : paginateTask(taskList)}
          </div>
        </div>
      </div>
    </>
  );
};
export default TodoList;
