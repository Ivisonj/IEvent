import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'
import { AttendaceDetails } from '@/core/attendance'

export const fetchGetAttendanceDetails = async (
  axios: AxiosInstance,
  eventId: string,
): Promise<AttendaceDetails[]> => {
  const response = await axios.get(
    `${BASE_URL}/${API_V1}/attendance-details/${eventId}`,
  )
  return response.data
}
