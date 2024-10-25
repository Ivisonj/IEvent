import { Box, useTheme, TableContainer, Table, Card } from '@mui/material'

import ParticipantsTableHead from './tableHead'
import ParticipantsTableContent from './tableContent'

export interface ParticipantsTableProps {
  data: {
    id: string
    participantName: string
    presenceCount: number
    lateCount: number
    absenceCount: number
  }[]
  lateLimit?: number
  absenceLimit?: number
}

const ParticipantsTable = ({
  data,
  lateLimit,
  absenceLimit,
}: ParticipantsTableProps) => {
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
            <ParticipantsTableHead />
            <ParticipantsTableContent
              data={data}
              lateLimit={lateLimit}
              absenceLimit={absenceLimit}
            />
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default ParticipantsTable
