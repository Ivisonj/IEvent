import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'
import { Notification } from '@/core/notification.interface'

export const fetchGetNotifications = async (
  axios: AxiosInstance,
): Promise<Notification[]> => {
  const response = await axios.get<Notification[]>(
    `${BASE_URL}/${API_V1}/notifications`,
  )
  return response.data
}
