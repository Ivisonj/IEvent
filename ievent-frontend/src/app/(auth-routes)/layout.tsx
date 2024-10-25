import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'

interface PrivateLayoutProps {
  children: ReactNode
}

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {
  const session = await getServerSession()

  if (session) {
    redirect('/user/home')
  }

  return <>{children}</>
}

export default PrivateLayout
