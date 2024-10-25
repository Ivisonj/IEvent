import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import MenuIcon from '@mui/icons-material/Menu'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'

import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { AxiosErrorResponse, handleError } from '@/data/axios'
import { fetchLeaveEvent } from '@/data/fetchs/fetchLeaveEvent'
import { dispatch } from '@/store'
import { selectUserQrCodeModalState } from '@/store/reducers/userQrCodeModal'
import { useSelector } from 'react-redux'
import UserQrCodeModal from '../userQrCodeModal'
import { useSession } from 'next-auth/react'

interface ParticipantMenuProps {
  participantId: string
}

const ParticipantMenu = ({ participantId }: ParticipantMenuProps) => {
  const router = useRouter()
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const leaveEvent = useMutation({
    mutationKey: ['leaveEvent'],
    mutationFn: () => fetchLeaveEvent(axiosAuth, participantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ParticipationEvents'] })
      router.replace('/user/home')
    },
    onError: (error: any) => {
      toast.error(handleError(error as AxiosErrorResponse))
    },
  })

  const openUserQrCodeModal = useSelector(
    (state: any) => state.userQrCodeModal.modalState,
  )

  const handleCloseModal = () =>
    dispatch(selectUserQrCodeModalState({ modalState: false }))

  const handleOpenUserQrCodeModaCLick = () => {
    dispatch(selectUserQrCodeModalState({ modalState: true }))
  }

  const handleLeaveEventClick = () => {
    leaveEvent.mutate()
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenUserQrCodeModaCLick}>
          <ListItemIcon>
            <QrCodeScannerIcon fontSize="small" />
          </ListItemIcon>
          QR Code
        </MenuItem>
        <MenuItem onClick={handleLeaveEventClick}>
          <ListItemIcon>
            <MeetingRoomIcon fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
        <Box>
          <UserQrCodeModal
            open={openUserQrCodeModal}
            name={String(session?.user.name)}
            email={String(session?.user.email)}
            handleClose={handleCloseModal}
          />
        </Box>
      </Menu>
    </>
  )
}

export default ParticipantMenu
