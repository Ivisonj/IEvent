import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MessageOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, TableBody, TableRow, TableCell } from '@mui/material'

import ParticipantStatus from './participantStatus'
import { ParticipantsTableProps } from '..'
import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { fetchRemoveParticipant } from '@/data/fetchs/fetchRemoveParticipant'
import useLocalStorage from '@/data/hooks/useLocalStorage'

const ParticipantsTableContent = ({
  data,
  lateLimit,
  absenceLimit,
}: ParticipantsTableProps) => {
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()
  const localStorage = useLocalStorage()
  const router = useRouter()

  const removeParticipant = useMutation({
    mutationKey: ['removeParticipant'],
    mutationFn: (data: string) => fetchRemoveParticipant(axiosAuth, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getParticipants'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    },
  })

  const handleShowMessageClick = (participantId: string) => {
    router.push(`/user/chat/${participantId}`)
    localStorage.set('accessedBy', 'event')
  }

  const handleDeleteUserClick = (id: string) => {
    removeParticipant.mutate(id)
  }
  return (
    <TableBody>
      {data?.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`

        return (
          <TableRow
            hover
            role="checkbox"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            tabIndex={-1}
            key={row.id}
          >
            <TableCell component="th" id={labelId} scope="row">
              {index + 1}
            </TableCell>
            <TableCell>{row.participantName}</TableCell>
            <TableCell>{row.presenceCount}</TableCell>
            <TableCell>
              <ParticipantStatus
                limit={Number(lateLimit)}
                status={row.lateCount}
              />
            </TableCell>
            <TableCell>
              <ParticipantStatus
                limit={Number(absenceLimit)}
                status={row.absenceCount}
              />
            </TableCell>
            <TableCell>
              <Button
                variant="text"
                sx={{ mr: 1, minWidth: '35px', height: '35px' }}
                onClick={() => handleShowMessageClick(row.id)}
              >
                <MessageOutlined style={{ fontSize: '1rem' }} />
              </Button>
              <Button
                variant="text"
                sx={{ px: 0, minWidth: '35px', height: '35px' }}
                onClick={() => handleDeleteUserClick(row.id)}
              >
                <DeleteOutlined style={{ fontSize: '1rem' }} />
              </Button>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default ParticipantsTableContent
