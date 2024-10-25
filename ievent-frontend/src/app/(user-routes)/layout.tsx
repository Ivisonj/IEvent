import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'

interface PrivateLayoutProps {
  children: ReactNode
}

const layout = async ({ children }: PrivateLayoutProps) => {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth')
  }

  return <>{children}</>
}

export default layout
