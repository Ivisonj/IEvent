import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BellOutlined, ScanOutlined } from '@ant-design/icons'
import {
  Box,
  Button,
  Stack,
  Badge,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { fetchGetNotifications } from '@/data/fetchs/fetchGetNotifications'
import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { useEffect } from 'react'
import { AxiosErrorResponse, handleError } from '@/data/axios'

const HeaderContent = () => {
  const router = useRouter()
  const theme = useTheme()
  const axiosAuth = useAxiosAuth()
  const { data: session } = useSession()

  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))

  const { data: notificationsData, error: notificationsErrors } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: () => fetchGetNotifications(axiosAuth),
    enabled: !!session,
  })

  const unreadNotifications = notificationsData?.filter(
    (n) => n.readed === false,
  )

  useEffect(() => {
    if (notificationsErrors) {
      toast.error(handleError(notificationsErrors as AxiosErrorResponse))
    }
  }, [notificationsErrors])

  return (
    <>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="space-between"
        sx={{ px: { xs: 1, lg: 3 } }}
      >
        <Stack direction="row" alignItems="center">
          {matchDownMd && (
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {session?.user.name[0]}
            </Avatar>
          )}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Button
            variant="text"
            sx={{ px: 0, minWidth: '48px', height: '48px' }}
            onClick={() => router.push('/user/notifications')}
          >
            <Badge badgeContent={unreadNotifications?.length} color="primary">
              <BellOutlined style={{ color: theme.palette.common.black }} />
            </Badge>
          </Button>
          <Button
            onClick={() => router.push('/scanner')}
            variant="text"
            sx={{ px: 0, minWidth: '48px', height: '48px' }}
          >
            <ScanOutlined style={{ color: theme.palette.common.black }} />
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default HeaderContent
