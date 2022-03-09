import styled, { css } from 'styled-components'

// type Altura = {
//   isEscolaridade?: boolean
// }

export const Container = styled.div`
  width: 100%;
  height: ${(({isEscolaridade}) => {
    if(isEscolaridade === true) return '80vh'
    return '40vh'
  })};
  display: flex;
  flex-direction: column;
  justify-content: end;
  border-radius: 15px;
  overflow: hidden;
  text-align: center;
  box-shadow: 8px 8px 5px rgba(0, 0, 0, 0.3);

  p {
    ${({ theme }) => css`
      background: ${theme.font.background};
      color: ${theme.font.cores.white};
      font-size: ${theme.font.sizes.title_Graficos};
      padding: 1rem;
      font-weight: 600;
    `}
  }
`
