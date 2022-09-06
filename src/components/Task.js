import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modals from './Modals'

const Task = (props) => {
  const [editmodal, seteditModal] = useState(false)
  const [taskHeading] = useState(props.taskObj.Name)
  const [taskDescription] = useState(props.taskObj.Des)

  const toggle = () => {
    seteditModal(!editmodal)
  }
  const handleDelete = () => {
    props.deleteTask(props.indexNo)
  }
  return (
    <>
      <div className="note mr-5">
        <div
          className="card-top"
          style={{
            'background-color': props.colors[props.indexNo % 5].primaryColor,
          }}
        ></div>
        <div className="task-heading">
          <span
            className="card-header"
            style={{
              'background-color':
                props.colors[props.indexNo % 5].secondaryColor,
            }}
          >
            {taskHeading}
          </span>
        </div>
        <div
          className="task-description"
          style={{
            'background-color': props.colors[props.indexNo % 5].secondaryColor,
          }}
        >
          <p>{taskDescription}</p>
        </div>
        <div className="notes-footer">
          <p>Time created {props.indexNo}</p>
          <div className="functional-buttons">
            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
          </div>
        </div>
      </div>
      <Modals
        editModal={editmodal}
        editToggle={toggle}
        index={props.indexNo}
        taskObj={props.taskObj}
        editEvent={props.handleEditEvent}
      />
    </>
  )
}

export default Task
