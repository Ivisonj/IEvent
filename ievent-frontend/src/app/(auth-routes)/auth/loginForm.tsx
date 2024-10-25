'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { VisibilityOff, Visibility } from '@mui/icons-material'
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
  CircularProgress,
  Typography,
  useTheme,
} from '@mui/material'

import IButton from '@/components/Ibutton'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty('Campo obrigatório')
    .email('Formato de E-mail inválido'),
  password: z
    .string()
    .nonempty('Campo obrigatório')
    .min(4, 'No mínimo 4 caracteres'),
})

type loginFormData = z.infer<typeof loginFormSchema>

const LoginForm = () => {
  const theme = useTheme()
  const router = useRouter()
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
  } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  })

  const [isLoading, setIsloading] = useState(false)

  const handleCLickSubmitForm = async (data: loginFormData) => {
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    setIsloading(true)

    if (response?.error) {
      toast.error('Invalid credentials')
      return
    }

    router.replace('/user/profile')
  }

  return (
    <Box
      onSubmit={handleSubmit(handleCLickSubmitForm)}
      component="form"
      autoComplete="off"
      width="100%"
    >
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
      <IButton type="submit">
        {isLoading && (
          <CircularProgress sx={{ color: theme.palette.common.white }} />
        )}
        {!isLoading && <Typography> Login</Typography>}
      </IButton>
    </Box>
  )
}

export default LoginForm
