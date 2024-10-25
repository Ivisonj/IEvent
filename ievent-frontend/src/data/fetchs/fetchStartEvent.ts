import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export interface StartEventProps {
  message: string
  eventLogId: string
}

export const fetchStartEvent = async (
  axios: AxiosInstance,
  eventId: string,
): Promise<StartEventProps> => {
  const response = await axios.post(
    `${BASE_URL}/${API_V1}/event-log/start/${eventId}`,
  )
  return response.data
}
