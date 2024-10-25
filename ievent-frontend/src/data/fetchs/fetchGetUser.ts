import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export interface GetUserProps {
  name: string
  email: string
}

export const fetchGetUser = async (
  axios: AxiosInstance,
): Promise<GetUserProps> => {
  const response = await axios.get(`${BASE_URL}/${API_V1}/user`)
  return response.data
}
