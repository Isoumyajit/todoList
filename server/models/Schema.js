import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
autoIncrement.initialize(mongoose.connection)

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    isRequired: true,
  },
  taskName: {
    type: String,
    isRequired: true,
  },
  taskDescription: {
    type: String,
    isRequired: true,
  },
})

TaskSchema.plugin(autoIncrement.plugin, 'Schema')
const Schema = mongoose.model('TasksTable', TaskSchema)
export default Schema
