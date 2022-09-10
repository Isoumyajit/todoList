import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

function EditModal(props) {
  const [taskHeading, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errors, setErrors] = useState(false);

  const validateForm = () => {
    if (taskHeading.length === 0 || taskDescription.length === 0) {
      setErrors(true);
    } else return true;
  };
  const editEventHandler = (event) => {
    event.preventDefault();
    if (validateForm()) {
      let newTask = {};
      newTask["taskName"] = taskHeading;
      newTask["taskDescription"] = taskDescription;
      props.editTask(props.taskObj._id, newTask);
      props.toggle();
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

  useEffect(() => {
    setTaskTitle(props.taskObj.taskName);
    setTaskDescription(props.taskObj.taskDescription);
  }, [props.taskObj.taskDescription, props.taskObj.taskName]);

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
