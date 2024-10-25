import { AxiosInstance } from 'axios'
import { API_V1, BASE_URL } from '../axios'

export interface EditeEventProps {
  name?: string
  description?: string
  address?: string
  isPublic?: boolean
  once?: boolean
  recurrence?: number[]
  custom_rules?: boolean
  tolerance_time?: number
  absences_limit?: number
  late_limit?: number
  start_date?: string | Date
  end_date?: string | Date
  start_time?: string | Date
  end_time?: string | Date
}

export const fetchEditeEvent = async (
  axios: AxiosInstance,
  eventId: string,
  data: EditeEventProps,
) => {
  const response = await axios.patch<EditeEventProps>(
    `${BASE_URL}/${API_V1}/event/update/${eventId}`,
    data,
  )
  return response.data
}
