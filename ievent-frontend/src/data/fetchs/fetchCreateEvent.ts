import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'

export interface EventProps {
  name: string
  description: string
  address: string
  isPublic: boolean
  once: boolean
  recurrence?: number[]
  custom_rules: boolean
  tolerance_time?: number
  absences_limit?: number
  late_limit?: number
  start_date: string | Date
  end_date: string | Date
  start_time: string | Date
  end_time: string | Date
}

export const fetchCreateEvent = async (
  axios: AxiosInstance,
  data: EventProps,
) => {
  const response = await axios.post(`${BASE_URL}/${API_V1}/event/create`, data)
  return response
}
