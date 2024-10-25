import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export const fetchChangeEventStatus = async (
  axios: AxiosInstance,
  eventId: string,
) => {
  const response = await axios.patch(
    `${BASE_URL}/${API_V1}/event/active-deactivate/${eventId}`,
  )
  return response.data
}
