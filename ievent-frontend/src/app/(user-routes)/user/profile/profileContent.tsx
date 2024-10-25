'use client'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { PoweroffOutlined, QrcodeOutlined } from '@ant-design/icons'
import {
  Box,
  Stack,
  Typography,
  Avatar,
  useTheme,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { dispatch } from '@/store'
import { formateName } from '@/utils/formateName'
import UserQrCodeModal from '@/components/userQrCodeModal'
import { selectUserQrCodeModalState } from '@/store/reducers/userQrCodeModal'
import useLocalStorage from '@/data/hooks/useLocalStorage'

const ProfileContent = () => {
  const theme = useTheme()
  const router = useRouter()
  const { data: session } = useSession()

  const localStorage = useLocalStorage()

  const page = useSelector((state: any) => state.menu.openItem)
  localStorage.set('page', page)

  const handleCloseModal = () =>
    dispatch(selectUserQrCodeModalState({ modalState: false }))

  const openUserQrCodeModal = useSelector(
    (state: any) => state.userQrCodeModal.modalState,
  )

  const handleClick = () => {
    dispatch(selectUserQrCodeModalState({ modalState: true }))
  }

  const handleSignOutClick = async () => {
    await signOut({
      redirect: false,
    })

    router.replace('/auth')
  }

  return (
    <>
      <Box
        width="100%"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column' },
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            width: { xs: '100%', sm: '50%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 100,
              height: 100,
              borderRadius: '30px',
              my: 1,
            }}
          >
            {session?.user.name[0]}
          </Avatar>
          <Typography variant="h4">
            {formateName(String(session?.user?.name))}
          </Typography>
          <Typography variant="h6">{session?.user?.email}</Typography>
        </Stack>
        <Stack
          sx={{
            width: { xs: '100%', sm: '50%' },
            display: 'flex',
          }}
          py={3}
        >
          <List
            component="nav"
            sx={{
              p: 0,
              '& .MuiListItemIcon-root': {
                minWidth: 32,
                color: theme.palette.grey[500],
              },
            }}
          >
            <ListItemButton
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onClick={handleClick}
            >
              <Stack direction="row" alignItems="center">
                <ListItemIcon>
                  <QrcodeOutlined />
                </ListItemIcon>
                <ListItemText primary="QR code" />
              </Stack>
            </ListItemButton>
            <ListItemButton
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onClick={handleSignOutClick}
            >
              <Stack direction="row" alignItems="center">
                <ListItemIcon>
                  <PoweroffOutlined />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </Stack>
            </ListItemButton>
          </List>
        </Stack>
      </Box>
      <Box>
        <UserQrCodeModal
          open={openUserQrCodeModal}
          name={String(session?.user.name)}
          email={String(session?.user.email)}
          handleClose={handleCloseModal}
        />
      </Box>
    </>
  )
}

export default ProfileContent
