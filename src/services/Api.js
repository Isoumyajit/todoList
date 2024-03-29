import axios from 'axios'
// const URL = 'https://todolistservices.herokuapp.com'
const URL = 'https://todoservices.vercel.app'
// const URL = "http://localhost:3001";

export const AddTasks = async (data) => {
  try {
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

export const updateTask = async (data) => {
  try {
    return await axios.post(`${URL}/update`, data)
  } catch (error) {
    console.log('Error during Update API call', error)
  }
}

export const deleteTheTask = async (data) => {
  try {
    await axios.post(`${URL}/remove`, data)
  } catch (error) {
    console.log('Error during remove API call')
  }
}
