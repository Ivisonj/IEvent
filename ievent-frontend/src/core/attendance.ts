export enum AttendanceStatusTypes {
  presence = 'presence',
  late = 'late',
  absence = 'absence',
}

export interface AttendaceDetails {
  attendanceId: string
  participantName: string
  date: string | Date
  status: string
  justified_absence: boolean
}

export interface Attendance {
  eventId: string
  eventLogId: string
  checkedInAt: string | Date
  email?: string
}

export interface AttendanceResponse {
  eventName: string
  participantName: string
  checkedInAt: string | Date
  status: AttendanceStatusTypes
}
