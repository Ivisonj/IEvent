import { AxiosInstance } from 'axios'
import { BASE_URL, API_V1 } from '../axios'
import { ParticpantStatus } from '@/components/searchPageCard'

interface Event {
  id: string
  creatorName: string
  name: string
  description: string
  address: string
  isPublic: boolean
  once: boolean
  isActive: boolean
  recurrence: number[]
  custom_rules: boolean
  tolerance_time: number
  absences_limit: number
  late_limit: number
  start_date: string | Date
  end_date: string | Date
  start_time: string | Date
  end_time: string | Date
  next_event_date: string | Date
  participationStatus: ParticpantStatus
}

export const fetchGetEventByName = async (
  axios: AxiosInstance,
  name: string,
): Promise<Event[]> => {
  const response = await axios.get<Event[]>(
    `${BASE_URL}/${API_V1}/event/find-by-name/${name}`,
  )
  return response.data
}
