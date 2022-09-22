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

// Import Section Ends here

const TodoList = () => {
  const [status, setStatus] = React.useState("");
  const dropdownitems = ["All", "Completed", "Incomplete"];
  const [allTask, setAllTasks] = useState([]);
  const [modal, setModal] = useState(false);
  // const [loading, setLoadingStatus] = useState(false);
  const [taskList, setTaskList] = useState([]);

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

  const getAllTasks = async () => {
    setTaskList([]);
    let arr = [];
    arr = await getTasks();

    if (arr) {
      console.log(arr);
      setTaskList([...arr["data"]]);
      setAllTasks([...arr["data"]]);
    }
    // else {
    //   <LoadingScreen />;
    // }
  };
  const deleteTask = async (object) => {
    if (deleteTheTask([object.taskObj._id])) {
      setTaskList((p) => {
        let arr = [...p];
        arr.splice(object.indexNo, 1);
        return arr;
      });
    }
  };
  const addTaskToDatabase = async (taskObj, userID) => {
    await AddTasks([taskObj, userID]);
    getAllTasks();
  };
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

  const saveTasks = (newTask) => {
    addTaskToDatabase(newTask, "Soumyajit");
  };
  const handleDeleteEvent = (id) => {
    deleteTask(id);
  };

  const handleEditEvent = (id, newTask) => {
    updateTasks(id, newTask);
    console.log(taskList);
  };

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
      } else if (target === "Incomplete") {
        setTaskList(arr);
      } else setTaskList(allTask);
    };
    showSelectedTasks(status);
  }, [allTask, status]);

  const handleChangeDropwDown = (event) => {
    setStatus(event.target.value);
  };
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
            {taskList.length < 1 ? (
              <LoadingScreen />
            ) : (
              taskList.map((obj, index) => (
                <Task
                  key={obj._id}
                  taskObj={obj}
                  indexNo={index}
                  colors={colors}
                  deleteTask={handleDeleteEvent}
                  handleEditEvent={handleEditEvent}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default TodoList;
