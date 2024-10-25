import { Stack, Typography, useTheme } from '@mui/material'

interface ParticipantStatusProps {
  limit: number
  status: number
}

const ParticipantStatus = ({ limit, status }: ParticipantStatusProps) => {
  const theme = useTheme()
  let color

  if (limit === status) {
    color = theme.palette.error.main
  } else if (limit - status === 1) {
    color = theme.palette.warning.main
  } else if (limit - status >= 2) {
    color = theme.palette.success.main
  }

  return (
    <Stack
      sx={{
        width: '35px',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        borderRadius: '10px',
        backgroundColor: color,
      }}
    >
      <Typography variant="h6">{status}</Typography>
    </Stack>
  )
}

export default ParticipantStatus
