'use client'
import { Box, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './loginForm'
import TransparentButton from '@/components/transparentButton'
import CreateUserForm from './createUserForm'
import { selectedCurrentForm } from '@/store/reducers/selectForm'

const DesktopAuthForm = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const isLoginForm = useSelector((state: any) => state.selectForm.isLoginForm)

  const handleClick = () => {
    dispatch(selectedCurrentForm({ isLoginForm: !isLoginForm }))
  }

  const boxContent = isLoginForm
    ? {
        title: 'Vamos Fazer Login?',
        message:
          'Olá, amigo(a)! Estamos felizes em saber que você está aqui. Faça o seu Login e aproveite a nossa plataforma de Eventos.',
        buttonChildren: 'Criar Conta',
      }
    : {
        title: 'Seja Bem-Vindo(a)!',
        message:
          'Olá, amigo(a)! Com alegria te apresento a nossa plataforma! Crie já a sua conta, gerencie seus evetos e aproveite. vamo ou bora?',
        buttonChildren: 'Fazer Login',
      }

  return (
    <Box width="100%" height="100%" display="flex">
      <Box
        position="relative"
        left={isLoginForm ? `0%` : `50%`}
        width="50%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: theme.palette.common.white,
          transition: theme.transitions.create('left', {
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Typography variant="h1" mb={3}>
          {isLoginForm ? 'Login' : 'Criar Conta'}
        </Typography>
        <Box
          width="50%"
          height="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {isLoginForm && <LoginForm />}
          {!isLoginForm && <CreateUserForm />}
        </Box>
      </Box>
      <Box
        position="absolute"
        right={isLoginForm ? `0%` : `50%`}
        width="50%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          transition: theme.transitions.create('right', {
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Typography variant="h1" mb={2}>
          {boxContent.title}
        </Typography>
        <Box width="70%" mb={4}>
          <Typography>{boxContent.message}</Typography>
        </Box>
        <TransparentButton onClick={handleClick}>
          {boxContent.buttonChildren}
        </TransparentButton>
      </Box>
    </Box>
  )
}

export default DesktopAuthForm
