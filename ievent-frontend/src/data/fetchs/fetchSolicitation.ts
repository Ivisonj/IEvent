import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'

export const fetchSolicitation = async (
  axios: AxiosInstance,
  eventId: string,
): Promise<void> => {
  const response = await axios.post(
    `${BASE_URL}/${API_V1}/participant/solicitation/${eventId}`,
  )
  return response.data
}
