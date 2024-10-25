'use client'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { Box, Typography } from '@mui/material'

import ParticipantStats from '@/components/participantStats'
import AttendanceTable from '../frequencyTable'
import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { fetchGetAttendanceDetails } from '@/data/fetchs/fetchGetAttendanceDetails'
import { AxiosErrorResponse, handleError } from '@/data/axios'
import { fetchGetParticipant } from '@/data/fetchs/fetchGetParticipant'
import ParticipantMenu from '@/components/participantMenu'
import { fetchGetEventById } from '@/data/fetchs/fetchGetEventById'
import Loading from './loading'

const EventPage = ({ params }: { params: { id: string } }) => {
  const axiosAuth = useAxiosAuth()
  const router = useRouter()
  const { data: session } = useSession()

  const {
    data: eventData,
    error: eventError,
    isLoading: isLoadingEvent,
  } = useQuery({
    queryKey: ['getEvent'],
    queryFn: () => fetchGetEventById(axiosAuth, params.id),
    enabled: !!session && !!params.id,
  })

  const {
    data: attendanceData,
    error: attendanceError,
    isLoading: isLoadingAttendance,
  } = useQuery({
    queryKey: ['getAttendanceDetails'],
    queryFn: () => fetchGetAttendanceDetails(axiosAuth, params.id),
    enabled: !!session && !!eventData,
  })

  const {
    data: participantData,
    error: participantError,
    isLoading: isLoadingParticipant,
  } = useQuery({
    queryKey: ['getParticipant'],
    queryFn: () => fetchGetParticipant(axiosAuth, params.id),
    enabled: !!session && !!eventData,
  })

  const isLoading =
    isLoadingEvent || isLoadingAttendance || isLoadingParticipant

  useEffect(() => {
    if (attendanceError) {
      toast.error(handleError(attendanceError as AxiosErrorResponse))
    } else if (participantError) {
      toast.error(handleError(participantError as AxiosErrorResponse))
    } else if (eventError) {
      router.replace('/user/home')
      toast.error(handleError(eventError as AxiosErrorResponse))
    }
  }, [attendanceError, participantError, eventError, router])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Box width="100%" height="auto" flexDirection="column">
      <Box width="100" mb={1} display="flex" justifyContent="space-between">
        <Typography variant="h5" mb={1}>
          {eventData?.name}
        </Typography>
        <ParticipantMenu
          participantId={participantData?.participantId as string}
        />
      </Box>
      <Box width="100%" flexWrap="wrap">
        <ParticipantStats
          presence={participantData?.presenceCount as number}
          late={participantData?.lateCount as number}
          absence={participantData?.absenceCount as number}
          nextEvent={
            eventData?.next_event_date
              ? eventData?.next_event_date
              : eventData?.start_date || ''
          }
        />
        <Box mt={2}>
          <Typography variant="h5" mb={1}>
            Frequência
          </Typography>
          <AttendanceTable
            data={attendanceData!}
            participantId={participantData?.participantId as string}
          />
        </Box>
      </Box>
      <Box width="100%" mt={2} mb={2} flexDirection="column">
        <Typography variant="h5" mb={1}>
          Descrição
        </Typography>
        <Typography variant="body1">{eventData?.description}</Typography>
      </Box>
    </Box>
  )
}

export default EventPage
