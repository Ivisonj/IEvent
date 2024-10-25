import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'
import { Chat } from '@/core/chat'

export const fetchGetChat = async (
  axios: AxiosInstance,
  participantId: string,
): Promise<Chat> => {
  const response = await axios.get(
    `${BASE_URL}/${API_V1}/chat/${participantId}`,
  )
  return response.data
}
