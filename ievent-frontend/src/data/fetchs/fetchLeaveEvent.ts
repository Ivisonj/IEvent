import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export const fetchLeaveEvent = async (
  axios: AxiosInstance,
  participantId: string,
) => {
  const response = await axios.patch(
    `${BASE_URL}/${API_V1}/participant/leave-event/${participantId}`,
  )
  return response.data
}
