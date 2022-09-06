import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
// import { faTrash } from '@fortawesome/fontawesome-free-solid'
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
            <div className="edit-button">
              <FontAwesomeIcon
                icon={faEdit}
                size="lg"
                className="edit-button mr-3"
                cursor="pointer"
                style={{
                  color: props.colors[props.indexNo % 5].primaryColor,
                }}
                onClick={() => seteditModal(true)}
              />
            </div>
            <div className="delete-button">
              <FontAwesomeIcon
                icon={faTrashCan}
                size="lg"
                className="delete-button mr-3"
                style={{
                  color: props.colors[props.indexNo % 5].primaryColor,
                }}
                cursor="pointer"
                onClick={handleDelete}
              />
            </div>
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
