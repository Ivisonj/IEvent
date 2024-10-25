import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'

interface GetEventLogsCountProps {
  eventLogsCount: number
}

export const fetchGetEventLogsCount = async (
  axios: AxiosInstance,
  eventId: string,
): Promise<GetEventLogsCountProps> => {
  const response = await axios.get<GetEventLogsCountProps>(
    `${BASE_URL}/${API_V1}/event-logs/${eventId}`,
  )
  return response.data
}
