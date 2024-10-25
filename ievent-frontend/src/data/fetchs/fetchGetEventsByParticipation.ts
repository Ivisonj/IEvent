import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'
import { Event } from '@/core/event.interface'

export const fetchGetEventByParticipation = async (
  axios: AxiosInstance,
): Promise<Event[]> => {
  const response = await axios.get<Event[]>(
    `${BASE_URL}/${API_V1}/event/find-by-participation`,
  )
  return response.data
}
