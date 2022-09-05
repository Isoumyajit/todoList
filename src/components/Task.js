<<<<<<< HEAD
import React from 'react'
import { FaPenSquare } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
=======
import React, { useState } from 'react'
import { FaPenSquare } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import Modals from './Modals'
>>>>>>> EditButton

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
              'border-radius': '5px',
            }}
          >
            {taskHeading}
          </span>
        </div>
<<<<<<< HEAD
        <div
          className="description-note"
          style={{
            'background-color': props.colors[props.indexNo % 5].secondaryColor,
          }}
        >
          <p>{props.taskObj.Des}</p>
        </div>
=======
        <p>{taskDescription}</p>
>>>>>>> EditButton
        <div className="notes-footer">
          {/* <p>Time created {props.indexNo}</p> */}
          <div className="functional-buttons">
            <FaPenSquare
              className="edit-button mr-3"
              size="1.2rem"
              cursor="pointer"
              style={{ color: props.colors[props.indexNo % 5].primaryColor }}
              onClick={() => seteditModal(true)}
            />
            <MdDeleteForever
              className="delete-button mr-3"
              size="1.2rem"
              cursor="pointer"
              onClick={handleDelete}
              style={{ color: props.colors[props.indexNo % 5].primaryColor }}
            />
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
