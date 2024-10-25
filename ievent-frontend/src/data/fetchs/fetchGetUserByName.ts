import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export interface GetUserByNameProps {
  name: string
  email: string
}

export const fetchGetUserByName = async (
  axios: AxiosInstance,
  name: string,
): Promise<GetUserByNameProps[]> => {
  const response = await axios.get(
    `${BASE_URL}/${API_V1}/user/find-by-name/${name}`,
  )
  return response.data
}
