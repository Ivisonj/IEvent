export interface Event {
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
}
