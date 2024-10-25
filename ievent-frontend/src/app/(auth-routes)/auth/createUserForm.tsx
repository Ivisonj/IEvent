'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import {
  Box,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material'

import IButton from '@/components/Ibutton'
import { useMutation } from '@tanstack/react-query'
import { fetchCreateUser } from '@/data/fetchs/fetchCreateUser'
import { selectedCurrentForm } from '@/store/reducers/selectForm'
import { AxiosErrorResponse, handleError } from '@/data/axios'

const createUserFormSchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  email: z
    .string()
    .nonempty('Campo obrigatório')
    .email('Formato de E-mail inválido'),
  password: z
    .string()
    .nonempty('Campo obrigatório')
    .min(4, 'No mínimo 4 caracteres'),
})

type createUserFormData = z.infer<typeof createUserFormSchema>

const CreateUserForm = () => {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: fetchCreateUser,
    onSuccess: (data) => {
      toast.success(data.data?.value?.message)
      dispatch(selectedCurrentForm({ isLoginForm: true }))
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(handleError(error))
    },
  })

  const handleClickSubmitForm = (data: createUserFormData) => {
    mutation.mutate(data)
  }

  return (
    <Box
      onSubmit={handleSubmit(handleClickSubmitForm)}
      component="form"
      autoComplete="off"
      width="100%"
    >
      <Box mb={3}>
        <TextField
          {...register('name')}
          fullWidth
          id="name-input"
          label="Nome Completo"
          variant="outlined"
          error={Boolean(errors.name)}
        />
        {errors.name && (
          <FormHelperText error>{errors.name.message}</FormHelperText>
        )}
      </Box>
      <Box mb={3}>
        <TextField
          {...register('email')}
          fullWidth
          id="email-input"
          label="E-mail"
          variant="outlined"
          error={Boolean(errors.email)}
        />
        {errors.email && (
          <FormHelperText error>{errors.email.message}</FormHelperText>
        )}
      </Box>
      <Box mb={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            {...register('password')}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            error={Boolean(errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {errors.password && (
          <FormHelperText error>{errors.password.message}</FormHelperText>
        )}
      </Box>
      <IButton type="submit">Criar</IButton>
    </Box>
  )
}

export default CreateUserForm
