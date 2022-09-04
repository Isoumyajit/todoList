import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modals from './Modals'
import Task from './Task'
import '../App.css'

const TodoList = () => {
  const colors = [
    {
      primaryColor: '#5D93E1',
      secondaryColor: '#ECF3FC',
    },
    {
      primaryColor: '#F9D288',
      secondaryColor: '#FEFAF1',
    },
    {
      primaryColor: '#5DC250',
      secondaryColor: '#F2FAF1',
    },
    {
      primaryColor: '#F48687',
      secondaryColor: '#FDF1F1',
    },
    {
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
    let arr = {}
    tempList[index] = newTask
    localStorage.setItem('tasksList', JSON.stringify(tempList))
    setTaskList(tempList)
    window.location.reload()
  }

  return (
    <>
      <div className="upper-label text-center">
        <h3 className="subject-heading">Todo List</h3>
        <div className="create-task-button">
          <Button variant="primary" onClick={() => setModal(true)}>
            Create your Tasks
          </Button>
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
