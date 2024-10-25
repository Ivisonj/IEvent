import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'

export const fetchUpdateNotificationStatus = async (
  axios: AxiosInstance,
  notificationId: string,
) => {
  const response = await axios.patch(
    `${BASE_URL}/${API_V1}/notification/update-status/${notificationId}`,
  )
  return response.data
}
