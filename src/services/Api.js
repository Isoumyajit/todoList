import axios from 'axios'

const URL = 'http://localhost:3001'

export const AddTasks = async (data) => {
  try {
    console.log('comes is AddTasks func')
    return await axios.post(`${URL}/add`, data)
  } catch (error) {
    console.log('Error while calling insertion API', error)
  }
}

export const getTasks = async () => {
  try {
    return await axios.get(`${URL}/all`)
  } catch (error) {
    console.log('Error in getting tasks from DB', error)
  }
}
