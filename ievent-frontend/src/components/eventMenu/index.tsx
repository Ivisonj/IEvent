import { toast } from 'sonner'
import { useState } from 'react'

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import EditIcon from '@mui/icons-material/Edit'
import PauseIcon from '@mui/icons-material/Pause'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import CropFreeIcon from '@mui/icons-material/CropFree'
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'

import AlertModal from '../alertModal'
import { SelectedOptionsAlertModal } from '../alertModal'
import { Event } from '@/core/event.interface'
import EventQrCodeModal from '../eventQrCodeModal'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchStartEvent } from '@/data/fetchs/fetchStartEvent'
import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { fetchFinishEvent } from '@/data/fetchs/fetchFinishEvent'
import useLocalStorage from '@/data/hooks/useLocalStorage'
import { StartEventProps } from '@/data/fetchs/fetchStartEvent'

interface EventMenuProps {
  eventData: Event
}

const EventMenu = ({ eventData }: EventMenuProps) => {
  const router = useRouter()
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()
  const localStorage = useLocalStorage()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [openModal, setOpenModal] = useState(false)
  const handleCloseModal = () => setOpenModal(false)

  const [selectedOptions, setSelectedOptions] =
    useState<SelectedOptionsAlertModal>()

  const handleChangeEventStatusClick = () => {
    setOpenModal(true)
    setSelectedOptions(SelectedOptionsAlertModal.changeEventStatus)
  }

  const handleDeleteEventClick = () => {
    setOpenModal(true)
    setSelectedOptions(SelectedOptionsAlertModal.deleteEvent)
  }

  const [openEventQrCodeModal, setOpenEventQrCodeModal] = useState(false)
  const handleCloseEventQrCodeModal = () => setOpenEventQrCodeModal(false)

  const handleOpenEventQrCodeModaCLick = () => {
    setOpenEventQrCodeModal(true)
  }

  const startEvent = useMutation({
    mutationKey: ['startEvent'],
    mutationFn: () => fetchStartEvent(axiosAuth, eventData?.id),
    onSuccess: (data: StartEventProps) => {
      queryClient.invalidateQueries({ queryKey: ['getEventLogs'] })
      toast.success(data.message)
      localStorage.set('eventLogId', data.eventLogId)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    },
  })

  const eventLogId = localStorage.get('eventLogId')

  const finishEvent = useMutation({
    mutationKey: ['finishEvent'],
    mutationFn: () => fetchFinishEvent(axiosAuth, eventLogId),
    onSuccess: (data) => {
      toast.success(data.message)
      localStorage.remove('eventLogId')
      queryClient.invalidateQueries({ queryKey: ['getParticipants'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    },
  })

  const handleStartAndFinishEvent = () => {
    if (!eventLogId) {
      startEvent.mutate()
    } else {
      finishEvent.mutate()
    }
  }

  const handleOpenQrCodeScanner = () => {
    if (eventLogId) {
      localStorage.set('eventId', eventData?.id)
      router.push('/scanner')
    }
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
        <MenuItem onClick={handleStartAndFinishEvent}>
          <PowerSettingsNewIcon
            sx={{
              color: eventLogId ? 'error.main' : 'success.main',
            }}
          />
          <Typography
            sx={{
              color: eventLogId ? 'error.main' : 'success.main',
            }}
          >
            {eventLogId ? 'Finalizar Evento' : 'Iniciar Evento'}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleOpenQrCodeScanner}>
          <ListItemIcon>
            <CropFreeIcon fontSize="small" />
          </ListItemIcon>
          Ler QR Code
        </MenuItem>
        <MenuItem onClick={handleOpenEventQrCodeModaCLick}>
          <ListItemIcon>
            <QrCodeScannerIcon fontSize="small" />
          </ListItemIcon>
          QR Code
        </MenuItem>
        <MenuItem
          onClick={() => router.push(`/user/edite-event/${eventData.id}`)}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar
        </MenuItem>
        <MenuItem onClick={handleChangeEventStatusClick}>
          <ListItemIcon>
            <PauseIcon fontSize="small" />
          </ListItemIcon>
          Ativar/Desativar
        </MenuItem>
        <MenuItem onClick={handleDeleteEventClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Excluir
        </MenuItem>
      </Menu>
      <Box position="absolute">
        <AlertModal
          open={openModal}
          selectedOptions={selectedOptions}
          eventData={eventData}
          handleClose={handleCloseModal}
        />
      </Box>
      {eventLogId && eventData && (
        <Box position="absolute">
          <EventQrCodeModal
            open={openEventQrCodeModal}
            eventData={eventData}
            eventLogId={eventLogId}
            handleClose={handleCloseEventQrCodeModal}
          />
        </Box>
      )}
    </>
  )
}

export default EventMenu
