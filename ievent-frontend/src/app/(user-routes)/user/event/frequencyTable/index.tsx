import { Box, useTheme, TableContainer, Table, Card } from '@mui/material'

import AttendanceTableHead from './tableHead'
import AttendanceTableContent from './tableContent'

export interface AttendanceTableProps {
  data: {
    attendanceId: string
    participantName: string
    date: string | Date
    status: string
    justified_absence: boolean
  }[]
  participantId: string
}

const AttendanceTable = ({ data, participantId }: AttendanceTableProps) => {
  const theme = useTheme()

  return (
    <Box width="100%">
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          bgColor: theme.palette.common.white,
        }}
      >
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' },
          }}
        >
          <Table aria-labelledby="tableTitle">
            <AttendanceTableHead />
            <AttendanceTableContent data={data} participantId={participantId} />
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default AttendanceTable
