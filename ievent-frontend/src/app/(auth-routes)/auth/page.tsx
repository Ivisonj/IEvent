'use client'
import { useEffect, useState } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'

import DesktopAuthLayout from './desktopAuthLayout'
import MobileAuthLayout from './mobileAuthLayout'

const AuthPage = () => {
  const theme = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <Box width="100%" height="100vh" overflow="hidden">
      {!matchDownMd && <DesktopAuthLayout />}
      {matchDownMd && <MobileAuthLayout />}
    </Box>
  )
}

export default AuthPage
