'use client'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import WeeklyCalendar from '@/components/weeklyCalendar'
import { useSelector } from 'react-redux'
import EventCard from '@/components/eventCard'
import { fetchGetEventsByDate } from '@/data/fetchs/fetchGetEventsByDate'
import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { AxiosErrorResponse, handleError } from '@/data/axios'
import { useSession } from 'next-auth/react'
import useLocalStorage from '@/data/hooks/useLocalStorage'

const Events = () => {
  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()

  const localStorage = useLocalStorage()

  const page = useSelector((state: any) => state.menu.openItem)
  localStorage.set('page', page)

  const calendarDate = useSelector((state: any) => state.calendarDate.date)

  const { data, error } = useQuery({
    queryKey: ['GetEventsByDate'],
    queryFn: () => fetchGetEventsByDate(axiosAuth, calendarDate),
    enabled: !!session && !!calendarDate,
  })

  queryClient.invalidateQueries({ queryKey: ['GetEventsByDate'] })

  useEffect(() => {
    if (error) {
      toast.error(handleError(error as AxiosErrorResponse))
    }
  }, [error])

  return (
    <>
      <Box flexDirection="column">
        <Box mb={2}>
          <Typography variant="h5">Eventos</Typography>
        </Box>
        <WeeklyCalendar />
        <Stack
          flexDirection="column"
          mt={2}
          flexWrap={'wrap'}
          direction="row"
          gap={1}
        >
          {data?.map((item) => (
            <EventCard
              key={item.id}
              name={item.name}
              date={item.start_date}
              start_time={item.start_time}
              end_time={item.end_date}
              address={item.address}
              next_event_date={item.next_event_date}
            />
          ))}
        </Stack>
      </Box>
    </>
  )
}

export default Events
