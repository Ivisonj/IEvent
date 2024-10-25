'use client'
import { Box, CircularProgress, useTheme } from '@mui/material'

const Loading = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
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
