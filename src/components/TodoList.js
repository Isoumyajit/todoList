import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modals from './Modals'
import Task from './Task'
import { AddTasks, getTasks, updateTask, deleteTheTask } from '../services/Api'
import '../App.css'

const TodoList = () => {
  const [modal, setModal] = useState(false)
  const [taskList, setTaskList] = useState([])

  const updateTasks = async (id, newtask) => {
    await updateTask([id, newtask, 'Soumyajit'])
    setTaskList((p) => {
      let arr = [...p]

      arr.forEach((data, i) => {
        if (data._id === id) {
          arr[i] = {
            ...data,
            ...newtask,
          }
        }
      })
      console.log('Arr: ', arr)
      return arr
    })
  }
  const getAllTasks = async () => {
    setTaskList([])
    let arr = await getTasks()
    if (arr) {
      console.log('Get All Task: ', arr)
      setTaskList([...arr['data']])
    }
  }
  const deleteTask = async (id) => {
    console.log(taskList[id])
    await deleteTheTask([id, 'Soumyajit'])
  }
  const addTaskToDatabase = async (taskObj, userID) => {
    await AddTasks([taskObj, userID])
    await getAllTasks()
  }
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

  const toggle = () => {
    setModal(!modal)
  }
  //  ** Using useEffect Hook to manage side-funtionalities like fetching values from localstorage
  //  ** There is two parameters one is
  // !callBack function
  // !Optional Array -- manage that this will run only once

  useEffect(() => {
    getAllTasks()
  }, [])

  const saveTasks = (newTask) => {
    addTaskToDatabase(newTask, 'Soumyajit')
  }
  const handleDeleteEvent = (id) => {
    deleteTask(id)
  }

  const handleEditEvent = (id, newTask) => {
    updateTasks(id, newTask)
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
          {taskList.length > 0 &&
            taskList.map((obj, index) => (
              <Task
                key={obj._id}
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
