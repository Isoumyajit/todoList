import mongoose from 'mongoose'

const db = async () => {
  const URL =
    'mongodb+srv://root:12345@todoapp.8mjzpmn.mongodb.net/TodoListDB?retryWrites=true&w=majority'
  try {
    console.log('successfuly Connected')
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  } catch (error) {
    console.log('Error in Connecting DB')
  }
}
export default db
