import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const Form = (props) => {
  const [taskHeading, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState(false);

  // TODO : Trying to make a input object to make it simple playing with inputs
  // const [values, setFormValues] = useState({
  //   taskName: "",
  //   description: "",
  // });

  // const inputs = [
  //   {
  //     id: 1,
  //     name: "taskName",
  //     type: "text",
  //     placeholder: "Task Name",
  //     label: "TaskName",
  //   },
  //   {
  //     id: 2,
  //     name: "taskDescription",
  //     type: "text",
  //     placeholder: "Describe the task",
  //     label: "Task Description",
  //   },
  // ];

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

  const validateData = () => {
    if (taskHeading.length === 0 || taskDescription.length === 0) {
      setError(true);
    } else return true;
  };
  const handleSave = (event) => {
    event.preventDefault();

    if (validateData()) {
      let taskList = {};
      taskList["Name"] = taskHeading;
      taskList["Des"] = taskDescription;
      props.saveTheTask(taskList);
      props.toggle();
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSave}>
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
            {error && taskHeading.length === 0 ? (
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
              placeholder="Describe The Task"
              class="form-control"
              id="Description"
              value={taskDescription}
              onChange={handleChangeTaskDescription}
            />
            {error && taskDescription.length <= 15 ? (
              <div className="formErrors">
                <label>
                  Task Description cann't be less than 15 characters{" "}
                </label>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="form-buttons">
            <Button type="submit" class="btn btn-primary bt-2">
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
