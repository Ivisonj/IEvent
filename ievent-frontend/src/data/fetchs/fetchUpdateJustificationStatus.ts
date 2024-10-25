import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'

export const fetchUpdateJustificationStatus = async (
  axios: AxiosInstance,
  attendanceId: string,
) => {
  const response = await axios.patch(
    `${BASE_URL}/${API_V1}/attendance/update-justification/${attendanceId}`,
  )
  return response.data
}
