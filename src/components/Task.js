import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
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
            props.taskObj.taskStatus === 'Completed'
              ? '#4f5b62'
              : props.colors[props.indexNo % 5].primaryColorContainer,
          textDecoration:
            props.taskObj.taskStatus === 'Completed' ? 'line-through' : 'none',
          filter:
            props.taskObj.taskStatus === 'Completed'
              ? 'blur(0.2px)'
              : 'blur(0)',
        }}
      >
        {props.taskObj.taskStatus === 'Completed' ? (
          <div className="green-tick">
            <FontAwesomeIcon
              icon={faCheckDouble}
              size="lg"
              style={{ color: '#00B8A3', padding: '5px !important' }}
            />
            <div className="completeMessageDivStyle">
              <label style={{ color: '#fff' }}> Completed</label>{' '}
            </div>
          </div>
        ) : (
          ''
        )}
        <div
          className="card-top"
          style={{
            'background-color':
              props.taskObj.taskStatus === 'Completed'
                ? '#00e676'
                : props.colors[props.indexNo % 5].primaryColor,
          }}
        ></div>
        <div className="task-heading">
          <span
            className="card-header"
            style={{
              'background-color': '#fff',
              'border-radius': '5px',
            }}
          >
            {props.taskObj.taskName}
          </span>
        </div>
        <div
          className="task-description"
          style={{
            'background-color': '#fff',
          }}
        >
          <p>{props.taskObj.taskDescription}</p>
        </div>
        <div className="notes-footer">
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
