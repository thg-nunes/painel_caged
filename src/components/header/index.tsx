import { ReactNode } from 'react'
import * as Styled from './styled'

type TypeChildren = {
  children: ReactNode
}

export const Header = ({ children }: TypeChildren) => {
  return <Styled.ContainerHeader>{children}</Styled.ContainerHeader>
}
