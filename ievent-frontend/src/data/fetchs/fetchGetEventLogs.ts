import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export interface GetEventLogsProps {
  id: string
  start_time: string | Date
  end_time?: string | Date
}

export const fetchGetEventLogs = async (
  axios: AxiosInstance,
  eventId: string,
): Promise<GetEventLogsProps[]> => {
  const response = await axios.get(
    `${BASE_URL}/${API_V1}/event-logs/${eventId}`,
  )
  return response.data
}
