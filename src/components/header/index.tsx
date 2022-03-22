import { ReactNode } from 'react'
import './style.css'

type TypeChildren = {
  children: ReactNode
}

export const Header = ({ children }: TypeChildren) => {
  return <div className='containerHeader'>{children}</div>
}
