import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'
const { VITE_API_URL } = getEnvVariables()

export const calendarAPI = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ! TODO: Configure interceptors
calendarAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['x-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
