import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { getStatusList } from "../services/TaskFilter";

function EditModal({ index, task, editEvent, editToggle, editModal }) {
  const [statusList, setStatusList] = useState(getStatusList());
  const [taskHeading, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errors, setErrors] = useState(false);
  const [status, setStatus] = useState("");
  const [time, setTime] = useState(null);

  const validateForm = () => {
    if (
      taskHeading.length === 0 ||
      taskDescription.length === 0 ||
      status.length === 0
    ) {
      setErrors(true);
    } else return true;
  };
  const editEventHandler = (event) => {
    event.preventDefault();
    if (validateForm()) {
      let newTask = {};
      newTask["taskName"] = taskHeading;
      newTask["taskDescription"] = taskDescription;
      newTask["taskStatus"] = status;
      editEvent(task._id, newTask);
      editToggle();
    }
  };
  // ** Here this Arrow funtion is used to handdle the change events for the TaskHeading field
  const handleChangeTask = (event) => {
    const taskName = event.target.value;
    setTaskTitle(taskName);
  };

  // ** Here this Arrow funtion is used to handdle the change events for the TaskDescrption Field
  const handleChangeTaskDescription = (event) => {
    const descr = event.target.value;
    setTaskDescription(descr);
  };

  const handleChangeStatusDropDown = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    setTaskTitle(task.taskName);
    setTaskDescription(task.taskDescription);
    if (typeof task.taskStatus === "undefined") setStatus("");
    else setStatus(task.taskStatus);
  }, [task.taskStatus, task.taskDescription, task.taskName]);

  return (
    <>
      <div>
        <form onSubmit={editEventHandler}>
          <div class="mb-3">
            <label for="Title" class="form-label">
              Title
            </label>
            <input
              placeholder="Heading"
              type="text"
              class="form-control"
              id="title"
              value={taskHeading}
              onChange={handleChangeTask}
            />
            {errors && taskHeading.length === 0 ? (
              <div className="formErrors">
                <label>Task Title cann't be blank </label>
              </div>
            ) : (
              ""
            )}
          </div>
          <div class="mb-3">
            <label for="Description" class="form-label">
              Description
            </label>
            <textarea
              placeholder="Describe the task"
              class="form-control"
              id="Description"
              value={taskDescription}
              onChange={handleChangeTaskDescription}
            />
            {errors && taskDescription.length <= 15 ? (
              <div className="formErrors">
                <label>
                  Task Description cann't be less than 15 characters{" "}
                </label>
              </div>
            ) : (
              ""
            )}
          </div>
          <div class="mb-3">
            <label for="Task-status" class="form-label"></label>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 110 }}
              style={{
                display: "flex",
                "flex-direction": "row",
                position: "relative",
                justifyContent: "space-between",
              }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-autowidth"
                value={status}
                label="Status"
                onChange={handleChangeStatusDropDown}
              >
                {statusList.map((st, index) => (
                  <MenuItem key={index} value={st}>
                    {st}
                  </MenuItem>
                ))}
              </Select>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Select Time"
                  value={time}
                  onChange={(newValue) => {
                    setTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>

            {errors && status.length === 0 ? (
              <div className="formErrors">
                <label>Status cann't be empty </label>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="form-buttons">
            <Button type="submit" class="btn btn-primary bt-2">
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditModal;
