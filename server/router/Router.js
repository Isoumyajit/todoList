import express from 'express'
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../controllers/RouteController.js'
const router = express.Router()
router.post('/add', addTask)
router.get('/all', getTasks)
router.post('/update', updateTask)
router.post('/remove', deleteTask)

export default router
