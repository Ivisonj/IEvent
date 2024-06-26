'use client'
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { Typography, Stack } from '@mui/material'

import EventStatus from '../eventStatus'
import MainCard from '../mainCard'

interface EventCardProps {
  title: string
  date: string
  time: string
  address: string
  hasStarted: boolean
}

const EventCard = ({
  title,
  date,
  time,
  address,
  hasStarted,
}: EventCardProps) => {
  return (
    <MainCard>
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
        <Typography variant="h4">{title}</Typography>
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
          <Typography variant="h6">Data, Hora e Status</Typography>
          <Stack width="100%" direction="row">
            <Typography pr={1} borderRight={`solid 1px`} variant="h5">
              {date}
            </Typography>
            <Typography pl={1} pr={1} borderRight={`solid 1px`} variant="h5">
              {time}
            </Typography>
            <Stack pl={1}>
              <EventStatus hasStarted={hasStarted} />
            </Stack>
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
          <EnvironmentOutlined style={{ fontSize: '1.5rem' }} />
        </Stack>
        <Stack width="98%" height="100%" direction="column">
          <Typography variant="h6">Endereço</Typography>
          <Typography
            variant="h5"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '1',
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
            }}
          >
            {address}
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  )
}

export default EventCard
