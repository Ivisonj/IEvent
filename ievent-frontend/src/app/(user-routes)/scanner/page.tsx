'use client'
import { useRouter } from 'next/navigation'
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'

import Html5Scanner from '@/components/html5Scanner'
import BarcodeScannerComponent from '@/components/barCodeScanner'
import { CloseOutlined } from '@ant-design/icons'
import ScannerModal from '@/components/scannerModal'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '@/store'
import { updateAttendanceData } from '@/store/reducers/attendance'

const Scanner = () => {
  const theme = useTheme()
  const router = useRouter()

  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))

  const handleClosePageClick = () => {
    router.replace('/user/home')
  }

  const [openScannerModal, setOpenScannerModal] = useState(false)
  const handleCloneModal = () => {
    const object = {}
    dispatch(updateAttendanceData(object))
    setOpenScannerModal(false)
  }

  const attendanceData = useSelector((state: any) => state.attendance)

  useEffect(() => {
    if (attendanceData && Object.keys(attendanceData).length > 0) {
      setOpenScannerModal(true)
    }
  }, [attendanceData])

  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="primary.darker"
      >
        <IconButton
          onClick={handleClosePageClick}
          sx={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            color: theme.palette.common.white,
          }}
        >
          <CloseOutlined />
        </IconButton>
        <Html5Scanner />
      </Box>
      <Box>
        <ScannerModal
          open={openScannerModal}
          attendanceData={attendanceData}
          handleClose={handleCloneModal}
        />
      </Box>
    </>
  )
}

export default Scanner
