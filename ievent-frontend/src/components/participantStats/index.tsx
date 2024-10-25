'use client'
import {
  CheckOutlined,
  WarningOutlined,
  CloseOutlined,
  CarryOutOutlined,
} from '@ant-design/icons'
import { Box, Typography, Stack, useTheme } from '@mui/material'

import MainCard from '../mainCard'
import extractDate from '@/utils/customDate/extractDate'

interface ParticipantStatsProps {
  presence: number
  late: number
  absence: number
  nextEvent: string | Date
}

const ParticipantStats = ({
  presence,
  late,
  absence,
  nextEvent,
}: ParticipantStatsProps) => {
  const theme = useTheme()
  return (
    <Box
      width="100%"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1,
      }}
    >
      <MainCard bgColor={theme.palette.success.dark}>
        <Typography variant="h6">Presenças</Typography>
        <Stack
          width="100%"
          height="45px"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <CheckOutlined style={{ fontSize: '1.5rem' }} />
          <Typography variant="h1" ml={1} sx={{ fontSize: '2rem' }}>
            {presence}
          </Typography>
        </Stack>
      </MainCard>
      <MainCard bgColor={theme.palette.warning.main}>
        <Typography variant="h6">Atrasos</Typography>
        <Stack
          width="100%"
          height="45px"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <WarningOutlined style={{ fontSize: '1.5rem' }} />
          <Typography variant="h1" ml={1} sx={{ fontSize: '2rem' }}>
            {late}
          </Typography>
        </Stack>
      </MainCard>
      <MainCard bgColor={theme.palette.error.main}>
        <Typography variant="h6">Faltas</Typography>
        <Stack
          width="100%"
          height="45px"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <CloseOutlined style={{ fontSize: '1.5rem' }} />
          <Typography variant="h1" ml={1} sx={{ fontSize: '2rem' }}>
            {absence}
          </Typography>
        </Stack>
      </MainCard>
      <MainCard bgColor={theme.palette.primary.main}>
        <Typography variant="h6">Próximo evento</Typography>
        <Stack
          width="100%"
          height="45px"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <CarryOutOutlined style={{ fontSize: '1.5rem' }} />
          <Typography variant="h1" ml={1} sx={{ fontSize: '1.8rem' }}>
            {extractDate(new Date(nextEvent))}
          </Typography>
        </Stack>
      </MainCard>
    </Box>
  )
}

export default ParticipantStats
