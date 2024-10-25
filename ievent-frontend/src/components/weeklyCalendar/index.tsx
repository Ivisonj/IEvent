'use client'
import { useDispatch } from 'react-redux'
import { Box, Typography, Stack } from '@mui/material'
import CalendarCard from './calendarCard'
import { selectedDate } from '@/store/reducers/calendarDate'
import { useSelector } from 'react-redux'

const monthNames = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nev',
  'Dez',
]
const weekNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

const WeeklyCalendar = () => {
  const dispatch = useDispatch()

  const date = new Date()
  const currentDay = String(date.getUTCDate()).padStart(2, '0')
  const year = date.getFullYear()
  const month = date.getMonth()
  const monthName = monthNames[month]

  const getDaysDate = () => {
    const daysData = []

    for (let i = 0; i < 7; i++) {
      const next = new Date(date.getTime())
      next.setDate(date.getDate() - date.getDay() + i)

      const weekDay = weekNames[next.getDay()]
      const day = String(next.getDate()).padStart(2, '0')
      const month = String(next.getMonth() + 1).padStart(2, '0')
      const year = String(next.getFullYear())

      daysData.push({ weekDay, day, month, year })
    }

    return daysData
  }

  const calendarDate = useSelector((state: any) => state.calendarDate.date)

  const handleDayClick = (selectDate: any) => {
    dispatch(
      selectedDate({
        date: `${selectDate.year}-${selectDate.month}-${selectDate.day}`,
      }),
    )
  }

  return (
    <Box display="column">
      <Box mb={1}>
        <Typography variant="h6">{`${currentDay} de ${monthName} de ${year}`}</Typography>
      </Box>
      <Stack direction="row" spacing={1}>
        {getDaysDate().map((dayDate, index) => (
          <CalendarCard
            key={index}
            weekDay={dayDate.weekDay}
            day={dayDate.day}
            isSelected={
              `${dayDate.year}-${dayDate.month}-${dayDate.day}` === calendarDate
            }
            onClick={() => handleDayClick(dayDate)}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default WeeklyCalendar
