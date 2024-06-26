import { Box, Typography } from '@mui/material'

// import NavGroup from './navGroup'
import menuItem from '@/layouts/mainLayout/menuItems'
import NavGroup from './navGroup'

const Navigation = () => {
  const navGroups = menuItem.items.map((item: any) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        )
    }
  })

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>
}

export default Navigation
