'use client'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Box, Button, Typography, Stack } from '@mui/material'

import EventCard from '@/components/eventCard'
import { fetGetMyEvents } from '@/data/fetchs/fetchGetMyEvents'
import { fetchGetEventByParticipation } from '@/data/fetchs/fetchGetEventsByParticipation'
import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { AxiosErrorResponse, handleError } from '@/data/axios'
import useLocalStorage from '@/data/hooks/useLocalStorage'
import { useSelector } from 'react-redux'

const Home = () => {
  const router = useRouter()
  const queryCLient = useQueryClient()
  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()
  const localStorage = useLocalStorage()

  const page = useSelector((state: any) => state.menu.openItem)
  localStorage.set('page', page)

  const { data: participationEventsData, error: participationEventsErrors } =
    useQuery({
      queryKey: ['ParticipationEvents'],
      queryFn: () => fetchGetEventByParticipation(axiosAuth),
      enabled: !!session,
    })

  const { data: myEventsData, error: myEventsErrors } = useQuery({
    queryKey: ['MyEvents'],
    queryFn: () => fetGetMyEvents(axiosAuth),
    enabled: !!session,
  })

  useEffect(() => {
    if (participationEventsData) {
      queryCLient.invalidateQueries({ queryKey: ['ParticipationEvents'] })
    } else if (myEventsData) {
      queryCLient.invalidateQueries({ queryKey: ['MyEvents'] })
    }
  }, [participationEventsData, myEventsData, queryCLient])

  useEffect(() => {
    if (participationEventsErrors) {
      toast.error(handleError(participationEventsErrors as AxiosErrorResponse))
    } else if (myEventsErrors) {
      toast.error(handleError(myEventsErrors as AxiosErrorResponse))
    }
  }, [participationEventsErrors, myEventsErrors])

  return (
    <Box width="100%" height="100%" flexDirection="column">
      <Box
        sx={{
          width: '100%',
          height: '50%',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h5" mb={1}>
          Participando
        </Typography>
        <Stack width="100%" flexWrap={'wrap'} direction="row" gap={1}>
          {participationEventsData?.map((item) => (
            <EventCard
              key={item.id}
              name={item.name}
              date={item.start_date}
              start_time={item.start_time}
              end_time={item.end_time}
              address={item.address}
              next_event_date={item.next_event_date}
              onClick={() => router.push(`/user/event/${item.id}`)}
            />
          ))}
        </Stack>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '50%',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Meus Eventos</Typography>
          <Button
            variant="text"
            onClick={() => router.push('/user/create-event')}
          >
            Criar Evento
          </Button>
        </Box>
        <Stack width="100%" flexWrap={'wrap'} direction="row" gap={1}>
          {myEventsData?.map((item) => (
            <EventCard
              key={item.id}
              name={item.name}
              date={item.start_date}
              start_time={item.start_time}
              end_time={item.end_time}
              address={item.address}
              next_event_date={item.next_event_date}
              onClick={() => router.push(`/user/my-event/${item.id}`)}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default Home
