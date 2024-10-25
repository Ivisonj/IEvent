import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'

export interface MessageProps {
  message: string
  sender: string
  sentAt: string | Date
}

export const fetchCreateMessage = async (
  axios: AxiosInstance,
  data: MessageProps,
  id: string,
) => {
  const response = await axios.post(
    `${BASE_URL}/${API_V1}/chat/send-message/${id}`,
    data,
  )
  return response.data
}
