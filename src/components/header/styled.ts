import styled, { css } from 'styled-components'

export const ContainerHeader = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    z-index: 5;
    background: ${theme.cores.headerBg};
    color: ${theme.font.cores.white};
  `}
`
