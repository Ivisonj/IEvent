import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'
import { Event } from '@/core/event.interface'

export const fetchGetEventsByDate = async (
  axios: AxiosInstance,
  date: string,
): Promise<Event[]> => {
  const response = await axios.get<Event[]>(
    `${BASE_URL}/${API_V1}/event/find-by-date?date=${date}`,
  )
  return response.data
}
