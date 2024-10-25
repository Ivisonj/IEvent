import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface calendarDateState {
  date: string
}

const date = new Date()
const currentDay = String(date.getDate()).padStart(2, '0')
const currentMonth = String(date.getMonth() + 1).padStart(2, '0')
const currentYear = String(date.getFullYear())

const initialState = {
  date: `${currentYear}-${currentMonth}-${currentDay}`,
}

const calendarDate = createSlice({
  name: 'calendar date',
  initialState,
  reducers: {
    selectedDate(
      state: calendarDateState,
      action: PayloadAction<{ date: string }>,
    ) {
      state.date = action.payload.date
    },
  },
})

export default calendarDate.reducer

export const { selectedDate } = calendarDate.actions
