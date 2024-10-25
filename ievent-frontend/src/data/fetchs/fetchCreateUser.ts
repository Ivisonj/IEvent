import axios from 'axios'
import { BASE_URL, API_V1 } from '../axios'

interface userProps {
  name: string
  email: string
  password: string
}

export const fetchCreateUser = async (data: userProps) => {
  const res = await axios.post(`${BASE_URL}/${API_V1}/user/create`, data)
  return res
}
