import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

import { Attendance } from '@/core/attendance'

export const fetchAttendance = async (
  axios: AxiosInstance,
  data: Attendance,
) => {
  const response = await axios.post(`${BASE_URL}/${API_V1}/attendance/`, data)
  return response.data
}
