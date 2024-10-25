import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export const fetchFinishEvent = async (
  axios: AxiosInstance,
  eventLogId: string,
) => {
  const response = await axios.patch(
    `${BASE_URL}/${API_V1}/event-log/finish/${eventLogId}`,
  )
  return response.data
}
