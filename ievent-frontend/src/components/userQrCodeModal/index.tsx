import QRcode from 'react-qr-code'
import { useEffect, useState } from 'react'
import { CloseOutlined, CameraOutlined } from '@ant-design/icons'
import { Box, Card, Icon, IconButton, Modal, Typography } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', lg: '40%' },
  bgcolor: 'background.paper',
  p: 4,
}

interface UserQrCodeModalProps {
  open: boolean
  name: string
  email: string
  handleClose: () => void
}

const UserQrCodeModal = ({
  open,
  name,
  email,
  handleClose,
}: UserQrCodeModalProps) => {
  const [qrCodeValue, setQrCodeValue] = useState<string>('')

  useEffect(() => {
    setQrCodeValue(email)
  }, [email])

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
            <Typography variant="h5">{name}</Typography>
          </Box>
        </Card>
      </Modal>
    </div>
  )
}

export default UserQrCodeModal
