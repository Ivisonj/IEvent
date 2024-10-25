import { CloseOutlined } from '@ant-design/icons'
import {
  Box,
  Card,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'

import { AttendanceResponse } from '@/core/attendance'
import { CheckCircleOutlined } from '@ant-design/icons'
import convertTimeToString from '@/utils/customDate/convertTimeToString'
import fixTimezone from '@/utils/customDate/fixTimezone'
import extractTime from '@/utils/customDate/extractTime'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', lg: '40%' },
  bgcolor: 'background.paper',
  p: 4,
}

interface ScannerModalProps {
  open: boolean
  attendanceData?: AttendanceResponse
  handleClose: () => void
}

const ScannerModal = ({
  open,
  attendanceData,
  handleClose,
}: ScannerModalProps) => {
  const theme = useTheme()
  const attendanceStatus =
    attendanceData?.status === 'presence'
      ? 'PRESENÇA'
      : attendanceData?.status === 'late'
        ? 'ATRASO'
        : attendanceData?.status === 'absence'
          ? 'FALTA'
          : ''

  // const checkedInAt = fixTimezone(new Date(attendanceData?.checkedInAt || ''))

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
            height="400px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <CheckCircleOutlined
              style={{ color: theme.palette.success.main, fontSize: '12rem' }}
            />
            <Stack
              mt={2}
              width="70%"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Stack display="flex" justifyContent="center">
                <Typography>
                  {`${attendanceData?.participantName} confimou presença no evento ${attendanceData?.eventName}, às ${attendanceData?.checkedInAt ? extractTime(new Date(attendanceData?.checkedInAt)) : ''}, com status ${attendanceStatus}`}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Card>
      </Modal>
    </div>
  )
}

export default ScannerModal
