import { ReactNode } from 'react'
import { Card, useTheme } from '@mui/material'

interface MainCardProps {
  children: ReactNode
  sx?: object
  height?: string
  bgColor?: string
  color?: string
  hover?: string
  onClick?: () => void
}

const MainCard = ({
  children,
  sx,
  height,
  bgColor,
  color,
  hover,
  onClick,
}: MainCardProps) => {
  const theme = useTheme()
  return (
    <Card
      onClick={onClick}
      variant="outlined"
      sx={{
        ...sx,
        width: {
          xs: '100%',
          sm: '49%',
          md: '49%',
          lg: '32.79%',
        },
        height: `${height || 'auto'}`,
        p: '16px',
        borderRadius: '20px',
        backgroundColor: `${bgColor || theme.palette.primary.main}`,
        color: `${color || theme.palette.primary.contrastText}`,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: `${hover}`,
        },
      }}
    >
      {children}
    </Card>
  )
}

export default MainCard
