import React, { useState } from "react";
import Button from "react-bootstrap/Button";
const Form = (props) => {
  const [taskHeading, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

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

  const handleSave = () => {
    let taskList = {};
    taskList["Name"] = taskHeading;
    taskList["Des"] = taskDescription;
    props.saveTheTask(taskList);
    props.toggle();
  };
  return (
    <>
      <div>
        <form>
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
          </div>
          <Button class="btn btn-primary" onClick={handleSave}>
            Create
          </Button>
        </form>
      </div>
    </>
  );
};

export default Form;
