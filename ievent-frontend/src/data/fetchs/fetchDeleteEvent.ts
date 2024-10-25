import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export const fetchDeleteEvent = async (
  axios: AxiosInstance,
  eventId: string,
) => {
  const response = await axios.delete(
    `${BASE_URL}/${API_V1}/event/delete/${eventId}`,
  )
  return response.data
}
