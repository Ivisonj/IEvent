import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'
import { ParticpantStatus } from '@/core/participant.interface'

export interface ResponseSolicitationProps {
  status: ParticpantStatus
}

export const fetchResponseSolicitation = async (
  axios: AxiosInstance,
  participantId: string,
  data: ResponseSolicitationProps,
) => {
  const response = await axios.patch<ResponseSolicitationProps>(
    `${BASE_URL}/${API_V1}/participant/response-solicitation/${participantId}`,
    data,
  )
  return response.data
}
