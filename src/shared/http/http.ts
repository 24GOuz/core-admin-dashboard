import axios from 'axios'

import { notifications } from '@mantine/notifications'
import { COOKIES } from '../constants'
import Cookies from 'js-cookie'
export const BASE_URL = import.meta.env.VITE_API_URL

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${Cookies.get(COOKIES.TOKEN)}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data.message

      if (error.response.status === 401) {
        Cookies.remove(COOKIES.TOKEN)
        notifications.show({
          message: errorMessage,
          title: 'Ошибка',
          color: 'red',
        })

        // window.location.replace('/')

        return Promise.reject({ message: error.response.data.message })
      }
      return Promise.reject(error.response.data)
    }
    return Promise.reject({ message: error.message || 'Unknown error' })
  },
)
