'use client'
import { Box, CircularProgress, useTheme } from '@mui/material'

const Loading = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.common.white,
        zIndex: 2,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
