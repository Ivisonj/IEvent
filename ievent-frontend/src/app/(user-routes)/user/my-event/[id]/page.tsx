'use client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { UserAddOutlined } from '@ant-design/icons'
import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'

import EventStats from '@/components/eventStats'
import ParticipantsTable from '../participantsTable'
import { fetchGetEvent } from '@/data/fetchs/fetchGetEvent'
import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { fetchGetEventLogs } from '@/data/fetchs/fetchGetEventLogs'
import { fetchGetParticipants } from '@/data/fetchs/fetchGetParticipants'
import EventMenu from '@/components/eventMenu'
import { fetchGetUserByName } from '@/data/fetchs/fetchGetUserByName'
import { GetUserByNameProps } from '@/data/fetchs/fetchGetUserByName'
import { queryClient } from '@/providers/queryClient'
import { fetchAddParticipant } from '@/data/fetchs/fetchAddParticipant'
import { AxiosErrorResponse, handleError } from '@/data/axios'
import { useRouter } from 'next/navigation'
import Loading from './loading'

const MyEvent = ({ params }: { params: { id: string } }) => {
  const axiosAuth = useAxiosAuth()
  const theme = useTheme()
  const router = useRouter()
  const { data: session } = useSession()

  const {
    data: eventData,
    error: eventError,
    isLoading: isEventLoading,
  } = useQuery({
    queryKey: ['getEvent'],
    queryFn: () => fetchGetEvent(axiosAuth, params.id),
    enabled: !!session && !!params.id,
  })

  const {
    data: participantsData,
    error: participantsError,
    isLoading: isParticipantsLoading,
  } = useQuery({
    queryKey: ['getParticipants'],
    queryFn: () => fetchGetParticipants(axiosAuth, eventData?.id as string),
    enabled: !!session && !!eventData,
  })

  const {
    data: eventLogsData,
    error: eventLogsError,
    isLoading: isEventLogsLoading,
  } = useQuery({
    queryKey: ['getEventLogs'],
    queryFn: () => fetchGetEventLogs(axiosAuth, eventData?.id as string),
    enabled: !!session && !!eventData,
  })

  const isLoading =
    isEventLoading || isParticipantsLoading || isEventLogsLoading

  useEffect(() => {
    if (eventError) {
      router.replace('/user/home')
      toast.error(handleError(eventError as AxiosErrorResponse))
    } else if (participantsError) {
      toast.error(handleError(participantsError as AxiosErrorResponse))
    } else if (eventLogsError) {
      toast.error(handleError(eventLogsError as AxiosErrorResponse))
    }
  }, [eventError, participantsError, eventLogsError, router])

  const [userData, setUserData] = useState<GetUserByNameProps[]>([])

  const getUserByName = useMutation({
    mutationKey: ['getUserByName'],
    mutationFn: (name: string) => fetchGetUserByName(axiosAuth, name),
    onSuccess: (data: GetUserByNameProps[]) => {
      setUserData(data)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    },
  })

  const handleInputChange = (event: any, value: string) => {
    if (value) {
      getUserByName.mutate(value)
    }
  }

  const addParticipant = useMutation({
    mutationKey: ['addParticipant'],
    mutationFn: (email: string) =>
      fetchAddParticipant(axiosAuth, eventData?.id as string, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getParticipants'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    },
  })

  const handleAddParticipantClick = (email: string) => {
    addParticipant.mutate(email)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Box width="100%" height="auto" flexDirection="column">
      <Box width="100" mb={1} display="flex" justifyContent="space-between">
        <Typography variant="h5" mb={1}>
          {eventData?.name}
        </Typography>
        <EventMenu eventData={eventData!} />
      </Box>
      <Box width="100%">
        <EventStats
          totalParticipants={participantsData?.length || 0}
          totalEvents={eventLogsData?.length || 0}
          nextEvent={
            eventData?.next_event_date
              ? eventData?.next_event_date
              : eventData?.start_date || ''
          }
        />
        <Box mt={2}>
          <Box
            width="100"
            mb={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" mb={1}>
              Participantes
            </Typography>
            <Autocomplete
              disablePortal
              options={Array.isArray(userData) ? userData : []}
              sx={{ width: { xs: '200px', lg: '300px' } }}
              onInputChange={handleInputChange}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Stack
                  {...props}
                  component="li"
                  direction="row"
                  key={option.email}
                >
                  <IconButton
                    onClick={() => handleAddParticipantClick(option.email)}
                  >
                    <UserAddOutlined
                      style={{ color: theme.palette.primary.main }}
                    />
                  </IconButton>
                  <Typography>{option.name}</Typography>
                </Stack>
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder="Buscar usuário..." />
              )}
            />
          </Box>
          <ParticipantsTable
            data={participantsData ?? []}
            lateLimit={eventData?.late_limit}
            absenceLimit={eventData?.absences_limit}
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

export default MyEvent
