'use client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Box, OutlinedInput, Stack, Typography } from '@mui/material'

import SearchPageCard from '@/components/searchPageCard'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchGetEventByName } from '@/data/fetchs/fetchGetEventByName'
import useAxiosAuth from '@/data/hooks/useAxiosAuth'
import { AxiosErrorResponse, handleError } from '@/data/axios'
import { useSelector } from 'react-redux'
import useLocalStorage from '@/data/hooks/useLocalStorage'

const SearchPage = () => {
  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()
  const [eventName, setEventName] = useState('')

  const localStorage = useLocalStorage()

  const page = useSelector((state: any) => state.menu.openItem)
  localStorage.set('page', page)

  const { data, error, refetch } = useQuery({
    queryKey: ['getEventByName'],
    queryFn: () => fetchGetEventByName(axiosAuth, eventName),
    enabled: !!session && !!eventName,
  })

  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: ['getEventByName'] })
    }
  }, [data, queryClient])

  useEffect(() => {
    if (error) {
      toast.error(handleError(error as AxiosErrorResponse))
    }
  }, [error])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value)
  }

  return (
    <Box width="100%" flexDirection="column">
      <Typography variant="h5" mb={1}>
        Buscar Evento
      </Typography>
      <Box mb={2} width="100%">
        <OutlinedInput
          fullWidth
          id="name"
          type="text"
          placeholder="Buscar evento..."
          onChange={handleChange}
        />
      </Box>
      <Stack width="100%" flexWrap={'wrap'} direction="row" gap={1}>
        {data?.map((item) => (
          <SearchPageCard
            key={item.id}
            eventId={item.id}
            name={item.name}
            date={item.start_date}
            start_time={item.start_time}
            end_time={item.end_date}
            next_event_date={item.next_event_date}
            creatorName={item.creatorName}
            participationStatus={item.participationStatus}
            refetch={refetch}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default SearchPage
