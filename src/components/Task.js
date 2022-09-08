import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Modals from './Modals'

const Task = (props) => {
  const [editmodal, seteditModal] = useState(false)

  const toggle = () => {
    seteditModal(!editmodal)
  }
  const handleDelete = () => {
    console.log(props.taskObj)
    props.deleteTask(props)
  }
  return (
    <>
      <div
        className="note mr-5"
        style={{
          border: '2px solid' + props.colors[props.indexNo % 5].primaryColor,
          backgroundColor:
            props.colors[props.indexNo % 5].primaryColorContainer,
        }}
      >
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
              'border-radius': '5px',
            }}
          >
            {props.taskObj.taskName}
          </span>
        </div>
        <div
          className="task-description"
          style={{
            'background-color': props.colors[props.indexNo % 5].secondaryColor,
          }}
        >
          <p>{props.taskObj.taskDescription}</p>
        </div>
        <div className="notes-footer">
          {/* <p>Time created {props.indexNo}</p> */}
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
