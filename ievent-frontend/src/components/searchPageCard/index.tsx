'use client'
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Typography, Stack, useTheme } from '@mui/material'

import TransparentButton from '../transparentButton'
import MainCard from '../mainCard'
import extractDate from '@/utils/customDate/extractDate'
import extractTime from '@/utils/customDate/extractTime'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchSolicitation } from '@/data/fetchs/fetchSolicitation'
import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { toast } from 'sonner'

export enum ParticpantStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

interface SearchPageCardProps {
  eventId: string
  name: string
  date: string | Date
  start_time: string | Date
  end_time: string | Date
  next_event_date?: string | Date
  creatorName: string
  participationStatus: ParticpantStatus
  refetch: () => void
}

const SearchPageCard = ({
  eventId,
  name,
  date,
  start_time,
  end_time,
  next_event_date,
  creatorName,
  participationStatus,
  refetch,
}: SearchPageCardProps) => {
  const theme = useTheme()
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['solicitation'],
    mutationFn: () => fetchSolicitation(axiosAuth, eventId),
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ['getEventByName'] })
        .then(() => refetch())
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    },
  })

  const handleCLick = () => {
    mutation.mutate()
  }

  const buttonChildren =
    participationStatus === ParticpantStatus.accepted
      ? 'Participando'
      : participationStatus === ParticpantStatus.pending
        ? 'Solicitado'
        : participationStatus === ParticpantStatus.rejected
          ? 'Solicitar'
          : participationStatus === undefined
            ? 'Solicitar'
            : ''
  return (
    <MainCard hover={theme.palette.primary.dark}>
      <Stack
        width="100%"
        mb={1}
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: '1',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h4">{name}</Typography>
      </Stack>
      <Stack width="100%" height="45px" direction="row" mb={1}>
        <Stack
          width="12%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <ClockCircleOutlined style={{ fontSize: '1.5rem' }} />
        </Stack>
        <Stack width="98%" height="100%" direction="column">
          <Typography variant="h6">Data e Hora</Typography>
          <Stack width="100%" direction="row">
            <Typography pr={1} borderRight={`solid 1px`} variant="h5">
              {next_event_date === undefined
                ? extractDate(new Date(date))
                : extractDate(new Date(next_event_date))}
            </Typography>
            <Typography pl={1} variant="h5">
              {`${extractTime(new Date(start_time))} - ${extractTime(new Date(end_time))}`}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack width="100%" height="45px" direction="row" mb={1}>
        <Stack
          width="12%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <UserOutlined style={{ fontSize: '1.5rem' }} />
        </Stack>
        <Stack width="98%" height="100%" direction="column">
          <Typography variant="h6">Criado Por</Typography>
          <Typography variant="h5">{creatorName}</Typography>
        </Stack>
      </Stack>
      <Stack width="100%" alignItems="flex-end">
        <TransparentButton onClick={handleCLick}>
          {buttonChildren}
        </TransparentButton>
      </Stack>
    </MainCard>
  )
}

export default SearchPageCard
