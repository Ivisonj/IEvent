import { Event } from '@/core/event.interface'
import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export const fetchGetEvent = async (
  axios: AxiosInstance,
  eventId: string,
): Promise<Event> => {
  const response = await axios.get(`${BASE_URL}/${API_V1}/event/${eventId}`)
  return response.data
}
