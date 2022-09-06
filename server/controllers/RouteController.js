import { response } from 'express'
import Schema from '../models/Schema.js'

export const addTask = async (req, res) => {
  const taskObj = req.body[0].Name
  const taskDes = req.body[0].Des
  const userID = req.body[1]
  const schema = new Schema({
    userId: userID,
    taskName: taskObj,
    taskDescription: taskDes,
  })
  try {
    await schema.save()
    res.status(201).json(schema)
  } catch (error) {
    console.log('Error in Inserting Task into DB')
  }
}

export const getTasks = async (req, res) => {
  try {
    const users = await Schema.find(
      { userId: 'Soumyajit' },
      {
        _id: 0,
        taskName: 1,
        taskDescription: 1,
      },
    )
    res.status(200).json(users)
  } catch (error) {
    console.log('Error in getTasks job', error)
    res.status(404).json({ Error: error.message })
  }
}
export const deleteTask = async (req, res) => {
  console.log(req.body)
  const userid = req.body[1]
  const taskname = req.body[0].taskName
  const taskDes = req.body[0].taskDescription
  console.log(userid, taskname, taskDes)
  try {
    await Schema.deleteOne({
      userId: userid,
      taskName: taskname,
      taskDescription: taskDes,
    })
    console.log('Success')
  } catch (error) {
    console.log('Error', error)
    res.status(404).json({ Error: error.message })
  }
}

export const updateTask = async (req, res) => {
  const index = req.body[0]
  const newtaskName = req.body[1].Name
  const newtaskDes = req.body[1].Des
  const userid = req.body[2]
  const task = new Schema({
    taskName: newtaskName,
    taskDescription: newtaskDes,
  })
  try {
    await Schema.updateOne({ _id: index, userId: userid }, task)
    return res.status(200).json(task)
  } catch (error) {
    res.status(404).json({ Error: error.message })
  }
}
