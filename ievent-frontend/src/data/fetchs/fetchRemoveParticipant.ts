import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export const fetchRemoveParticipant = async (
  axios: AxiosInstance,
  participantId: string,
) => {
  const response = await axios.patch(
    `${BASE_URL}/${API_V1}/participant/remove/${participantId}`,
  )
  return response.data
}
