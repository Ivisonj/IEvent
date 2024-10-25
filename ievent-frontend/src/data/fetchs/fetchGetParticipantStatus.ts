import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'
import { ParticpantStatus } from '@/core/participant.interface'

interface FetchGetParticipantStatusProps {
  status: ParticpantStatus
}

export const fetchGetParticipantStatus = async (
  axios: AxiosInstance,
  participantId: string,
) => {
  const response = await axios.get<FetchGetParticipantStatusProps>(
    `${BASE_URL}/${API_V1}/participant/participant-status/${participantId}`,
  )
  return response.data
}
