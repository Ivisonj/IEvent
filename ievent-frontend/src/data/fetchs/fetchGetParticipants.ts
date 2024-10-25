import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'
import { Participant } from '@/core/participant.interface'

export const fetchGetParticipants = async (
  axios: AxiosInstance,
  eventId: string,
): Promise<Participant[]> => {
  const response = await axios.get(
    `${BASE_URL}/${API_V1}/participants/${eventId}`,
  )
  return response.data
}
