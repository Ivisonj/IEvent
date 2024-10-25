import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AttendanceState {
  eventName?: string
  participantName?: string
  checkedInAt?: string | Date
  status?: 'presence' | 'late' | 'absence'
}

const initialState: AttendanceState = {}

const attendance = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    updateAttendanceData(state, action: PayloadAction<AttendanceState>) {
      return { ...action.payload }
    },
  },
})

export default attendance.reducer

export const { updateAttendanceData } = attendance.actions
