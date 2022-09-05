import React from 'react'
import { FaPenSquare } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

const Task = (props) => {
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
            {props.taskObj.Name}
          </span>
        </div>
        <div
          className="description-note"
          style={{
            'background-color': props.colors[props.indexNo % 5].secondaryColor,
          }}
        >
          <p>{props.taskObj.Des}</p>
        </div>
        <div className="notes-footer">
          {/* <p>Time created {props.indexNo}</p> */}
          <div className="functional-buttons">
            <FaPenSquare
              className="edit-button mr-3"
              size="1.2rem"
              cursor="pointer"
              style={{ color: props.colors[props.indexNo % 5].primaryColor }}
              onClick={props.toggle}
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
    </>
  )
}

export default Task
