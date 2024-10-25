import { useRouter } from 'next/navigation'
import { MessageOutlined } from '@ant-design/icons'
import { Button, TableBody, TableRow, TableCell, useTheme } from '@mui/material'

import AttendanceStatus from '../attendanceStatus'
import { AttendanceTableProps } from '..'
import convertDateToString from '@/utils/customDate/convertDateToString'
import useLocalStorage from '@/data/hooks/useLocalStorage'

interface AttendanceProps {
  attendanceId: string
  participantName: string
  date: string | Date
  status: string
  justified_absence: boolean
}

const AttendanceTableContent = ({
  data,
  participantId,
}: AttendanceTableProps) => {
  const router = useRouter()
  const localStorage = useLocalStorage()
  const theme = useTheme()

  const handleShowMessageClick = (attendanceData: AttendanceProps) => {
    localStorage.set('accessedBy', 'user')
    router.push(`/user/chat/${participantId}`)

    if (!attendanceData.justified_absence) {
      localStorage.set('attendanceId', attendanceData.attendanceId)
    }
  }

  return (
    <TableBody>
      {data?.map((row, index) => {
        return (
          <TableRow
            hover
            role="checkbox"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            tabIndex={-1}
            key={row.attendanceId}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell component="th">
              {convertDateToString(new Date(row.date))}
            </TableCell>
            <TableCell>
              <AttendanceStatus status={row.status} />
            </TableCell>
            <TableCell>
              {row.justified_absence === null && '--'}
              {row.justified_absence === false && 'Não'}
              {row.justified_absence === true && 'Sim'}
            </TableCell>
            <TableCell>
              <Button
                variant="text"
                sx={{ mr: 1, minWidth: '35px', height: '35px' }}
                onClick={() => handleShowMessageClick(row)}
              >
                <MessageOutlined
                  style={{
                    fontSize: '1rem',
                    color:
                      row.justified_absence || row.status === 'presence'
                        ? theme.palette.grey[500]
                        : theme.palette.primary.main,
                  }}
                />
              </Button>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default AttendanceTableContent
