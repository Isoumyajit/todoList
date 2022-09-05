import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

function EditModal(props) {
  const [taskHeading, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  const editEventHandler = () => {
    console.log(props.index, props.taskObj.Name, props.taskObj.Des)
    let newTask = {}
    newTask['Name'] = taskHeading
    newTask['Des'] = taskDescription
    props.editTask(props.index, newTask)
    props.toggle()
  }
  // ** Here this Arrow funtion is used to handdle the change events for the TaskHeading field
  const handleChangeTask = (event) => {
    const taskName = event.target.value
    setTaskTitle(taskName)
  }

  // ** Here this Arrow funtion is used to handdle the change events for the TaskDescrption Field
  const handleChangeTaskDescription = (event) => {
    const descr = event.target.value
    setTaskDescription(descr)
  }

  useEffect(() => {
    setTaskTitle(props.taskObj.Name)
    setTaskDescription(props.taskObj.Des)
  }, [props.taskObj.Des, props.taskObj.Name])

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
          <div className="form-buttons">
            <Button class="btn btn-primary bt-2" onClick={editEventHandler}>
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditModal
