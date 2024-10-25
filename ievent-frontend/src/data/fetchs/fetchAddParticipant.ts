import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export const fetchAddParticipant = async (
  axios: AxiosInstance,
  eventId: string,
  email: string,
) => {
  const response = await axios.post(
    `${BASE_URL}/${API_V1}/participant/add/${eventId}`,
    { email },
  )
  return response.data
}
