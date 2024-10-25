import { toast } from 'sonner'
import { dispatch } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { Html5Qrcode } from 'html5-qrcode'
import { CameraOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Icon, Typography, useTheme } from '@mui/material'

import { Attendance, AttendanceResponse } from '@/core/attendance'
import { useMutation } from '@tanstack/react-query'
import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { AxiosErrorResponse, handleError } from '@/data/axios'
import { fetchAttendance } from '@/data/fetchs/fetchAttendance'
import useLocalStorage from '@/data/hooks/useLocalStorage'
import { isEmail } from '@/utils/isEmail'
import { updateAttendanceData } from '@/store/reducers/attendance'

const Html5Scanner = () => {
  const theme = useTheme()
  const axiosAuth = useAxiosAuth()
  const localStorage = useLocalStorage()
  const scannerRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useDispatch()

  const [decodedText, setDecodedText] = useState<string | null>(null)

  const mutation = useMutation({
    mutationKey: ['attendance'],
    mutationFn: (data: Attendance) => fetchAttendance(axiosAuth, data),
    onSuccess: (data: AttendanceResponse) => {
      dispatch(updateAttendanceData(data))
    },
    onError: (error: any) => {
      toast.error(handleError(error as AxiosErrorResponse))
    },
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (scannerRef.current) {
        const html5QrCode = new Html5Qrcode(scannerRef.current.id)
        const config = { fps: 10, qrbox: { width: 250, height: 250 } }

        html5QrCode
          .start(
            { facingMode: 'environment' },
            config,
            (decodedText) => {
              setDecodedText(decodedText)
            },
            (errorMessage) => {
              if (!errorMessage.includes('NotFoundException')) {
                console.log(`Error message: ${errorMessage}`)
              }
            },
          )
          .catch((err) => {
            console.error('Error starting Html5Qrcode', err)
          })

        return () => {
          html5QrCode
            .stop()
            .then(() => {
              html5QrCode.clear()
            })
            .catch((err) => {
              console.error('Error stopping Html5QrCode', err)
            })
        }
      }
    }, 300)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (decodedText) {
      const convertedData = JSON.parse(decodedText)
      const eventLogId = localStorage.get('eventLogId')
      const eventId = localStorage.get('eventId')

      const attendanceData: Attendance = {
        eventId: convertedData?.eventId || eventId,
        eventLogId: convertedData?.eventLogId || eventLogId,
        checkedInAt: convertedData?.checkedInAt
          ? new Date(convertedData.checkedInAt)
          : new Date(),
        email: isEmail(convertedData) ? convertedData : undefined,
      }

      mutation.mutate(attendanceData)
    }
  }, [decodedText])

  return (
    <Box
      width="70%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Icon>
        <CameraOutlined style={{ color: theme.palette.common.white }} />
      </Icon>
      <div
        id="reader"
        ref={scannerRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 'auto',
          maxWidth: '400px',
        }}
      />
      <Typography variant="h5" sx={{ color: theme.palette.common.white }}>
        Aponte a câmera para o QR Code
      </Typography>
    </Box>
  )
}

export default Html5Scanner
