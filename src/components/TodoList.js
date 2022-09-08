import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modals from './Modals'
import Task from './Task'
import '../App.css'

const TodoList = () => {
  const colors = [
    {
      primaryColorContainer: '#9B59B6',
      primaryColor: '#5D93E1',
      secondaryColor: '#ECF3FC',
    },
    {
      primaryColorContainer: '#2ECC71',
      primaryColor: '#F9D288',
      secondaryColor: '#FEFAF1',
    },
    {
      primaryColorContainer: '#1ABC9C',
      primaryColor: '#5DC250',
      secondaryColor: '#F2FAF1',
    },
    {
      primaryColorContainer: '#FDA4AF',
      primaryColor: '#F48687',
      secondaryColor: '#FDF1F1',
    },
    {
      primaryColorContainer: '#F1C40F',
      primaryColor: '#B964F7',
      secondaryColor: '#F3F0FD',
    },
  ]
  const [modal, setModal] = useState(false)
  const [taskList, setTaskList] = useState([])

  const toggle = () => {
    setModal(!modal)
  }

  //  ** Using useEffect Hook to manage side-funtionalities like fetching values from localstorage
  //  ** There is two parameters one is
  // !callBack function
  // !Optional Array -- manage that this will run only once

  useEffect(() => {
    let arr = localStorage.getItem('tasksList')
    if (arr) {
      let listItems = JSON.parse(arr)
      setTaskList(listItems)
    }
  }, [])

  const saveTasks = (newTask) => {
    let taskObjectList = taskList
    taskObjectList.push(newTask)
    setTaskList(taskObjectList)
    localStorage.setItem('tasksList', JSON.stringify(taskList))
  }

  const handleDeleteEvent = (index) => {
    let tempList = taskList
    tempList.splice(index, 1)
    localStorage.setItem('tasksList', JSON.stringify(tempList))
    setTaskList(tempList)
    window.location.reload()
  }

  const handleEditEvent = (index, newTask) => {
    let tempList = taskList
    tempList[index] = newTask
    localStorage.setItem('tasksList', JSON.stringify(tempList))
    setTaskList(tempList)
    window.location.reload()
  }

  return (
    <>
      <div className="upper-label text-center">
        <div className="upper-section">
          <div className="search-bar"></div>
          <div className="create-task-button">
            <FontAwesomeIcon
              type="button"
              icon={faPlus}
              size="lg"
              onClick={() => setModal(true)}
            />
          </div>
        </div>
      </div>
      <div className="tasks">
        <Modals toggle={toggle} modal={modal} saveTask={saveTasks} />
      </div>
      <div className="container-tasks-main">
        <div className="task-container">
          {taskList.map((obj, index) => (
            <Task
              taskObj={obj}
              indexNo={index}
              colors={colors}
              deleteTask={handleDeleteEvent}
              handleEditEvent={handleEditEvent}
            />
          ))}
        </div>
      </div>
    </>
  )
}
export default TodoList
