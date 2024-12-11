import axios from 'axios'
import type { AxiosError, AxiosResponse, AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${location.origin}/data`
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => Promise.reject(error.response)
)

export default axiosInstance
