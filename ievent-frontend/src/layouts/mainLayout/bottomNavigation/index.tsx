import Link from 'next/link'
import { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'

import menuItems from '../menuItems'
import { activeItem } from '@/store/reducers/menu'
import useLocalStorage from '@/data/hooks/useLocalStorage'

const BottomNavigationComponent = () => {
  const dispatch = useDispatch()
  const localStorage = useLocalStorage()

  const openItem = useSelector((state: any) => state.menu.openItem)
  localStorage.set('page', openItem)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(activeItem({ openItem: [newValue] }))
  }

  const itemHandler = (id: any & void) => {
    dispatch(activeItem({ openItem: [id] }))
  }

  return (
    <BottomNavigation
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: 60,
      }}
      value={openItem[0]}
      onChange={handleChange}
    >
      {menuItems.items[0].children.map((item: any) => {
        const Icon = item.icon
        const itemIcon = item.icon ? (
          <Icon style={{ fontSize: '1.5rem' }} />
        ) : (
          false
        )

        const itemTarget = item.target ? '_blank' : '_self' // Alterado para const
        const LinkComponent = forwardRef<HTMLAnchorElement, any>(
          function LinkComponent(props, ref) {
            const newProps = {
              ...props,
              href: `/${item.url}`,
              target: itemTarget,
            }

            return <Link ref={ref} {...newProps} />
          },
        )

        let listItemProps: any = { component: LinkComponent }
        if (item?.external) {
          listItemProps = { component: 'a', href: item.url, target: itemTarget }
        }

        return (
          <BottomNavigationAction
            {...listItemProps}
            key={item.id}
            onClick={() => itemHandler(item.id)}
            label={item.title}
            value={item.id}
            icon={itemIcon}
          />
        )
      })}
    </BottomNavigation>
  )
}

export default BottomNavigationComponent
