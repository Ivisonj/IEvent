import QRcode from 'react-qr-code'
import { useEffect, useState } from 'react'
import { CloseOutlined, CameraOutlined } from '@ant-design/icons'
import { Box, Card, Icon, IconButton, Modal, Typography } from '@mui/material'

import { Event } from '@/core/event.interface'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', lg: '40%' },
  bgcolor: 'background.paper',
  p: 4,
}

interface EventQrCodeModalProps {
  open: boolean
  eventData: Event
  eventLogId: string
  handleClose: () => void
}

interface QrCodeProps {
  eventId: string
  eventLogId: string
  checkedInAt: string | Date
}

const EventQrCodeModal = ({
  open,
  eventData,
  eventLogId,
  handleClose,
}: EventQrCodeModalProps) => {
  const currentDate = new Date()
  const [checkedInAtValue, setCheckedInAt] = useState<Date>(currentDate)
  const [qrCodeValue, setQrCodeValue] = useState<QrCodeProps>({
    eventId: eventData?.id,
    eventLogId: eventLogId,
    checkedInAt: checkedInAtValue,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date()
      setCheckedInAt(currentTime)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setQrCodeValue({
      eventId: eventData?.id,
      eventLogId: eventLogId,
      checkedInAt: checkedInAtValue,
    })
  }, [checkedInAtValue, eventData, eventLogId])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card variant="outlined" sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: '10px', top: '10px' }}
          >
            <CloseOutlined />
          </IconButton>
          <Box
            width="100%"
            height="auto"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Icon>
              <CameraOutlined />
            </Icon>
            <Box mt={2} mb={2}>
              <QRcode size={200} value={JSON.stringify(qrCodeValue)} />
            </Box>
            <Typography variant="h5">{eventData?.name}</Typography>
          </Box>
        </Card>
      </Modal>
    </div>
  )
}

export default EventQrCodeModal
