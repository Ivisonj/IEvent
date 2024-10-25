import { Stack, Typography, Avatar, useTheme } from '@mui/material'
import { useSession } from 'next-auth/react'

const DrawerHeader = () => {
  const { data: session } = useSession()
  const theme = useTheme()
  return (
    <Stack
      sx={{
        width: '100%',
        height: 175,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Avatar
        sx={{
          bgcolor: theme.palette.primary.main,
          width: 100,
          height: 100,
          borderRadius: '30px',
          my: 2,
        }}
      >
        {session?.user.name[0]}
      </Avatar>
      <Typography variant="h3">{session?.user.name}</Typography>
    </Stack>
  )
}

export default DrawerHeader
