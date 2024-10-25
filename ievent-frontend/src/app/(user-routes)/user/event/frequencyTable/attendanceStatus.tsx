import { Stack, Typography, useTheme } from '@mui/material'

interface AttendanceStatusProps {
  status: string
}

const AttendanceStatus = ({ status }: AttendanceStatusProps) => {
  const theme = useTheme()
  let color
  let text

  switch (status) {
    case 'presence':
      color = theme.palette.success.main
      text = 'Presença'
      break
    case 'late':
      color = theme.palette.warning.main
      text = 'Atraso'
      break
    case 'absence':
      color = theme.palette.error.main
      text = 'Falta'
      break
  }

  return (
    <Stack
      sx={{
        width: '100px',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        borderRadius: '10px',
        backgroundColor: color,
      }}
    >
      <Typography variant="h6">{text}</Typography>
    </Stack>
  )
}

export default AttendanceStatus
