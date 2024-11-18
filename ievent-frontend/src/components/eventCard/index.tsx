import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { Typography, Stack, useTheme } from '@mui/material'

import MainCard from '../mainCard'
import extractDate from '@/utils/customDate/extractDate'
import extractTime from '@/utils/customDate/extractTime'

interface EventCardProps {
  name: string
  date: string | Date
  start_time: string | Date
  end_time: string | Date
  address: string
  next_event_date?: string | Date
  onClick?: () => void
}

const EventCard = ({
  name,
  date,
  start_time,
  end_time,
  address,
  next_event_date,
  onClick,
}: EventCardProps) => {
  const theme = useTheme()
  return (
    <MainCard onClick={onClick} hover={theme.palette.primary.dark}>
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
              {next_event_date === null
                ? extractDate(new Date(date))
                : extractDate(new Date(next_event_date!))}
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
