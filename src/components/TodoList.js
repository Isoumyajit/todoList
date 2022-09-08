import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
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
      setTaskList([...arr['data']])
    }
  }
  const deleteTask = async (object) => {
    if (deleteTheTask([object.taskObj._id])) {
      setTaskList((p) => {
        let arr = [...p]
        arr.splice(object.indexNo, 1)
        return arr
      })
    }
  }
  const addTaskToDatabase = async (taskObj, userID) => {
    await AddTasks([taskObj, userID])
    getAllTasks()
  }
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
    // getAllTasks()
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
