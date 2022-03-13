import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: ${({isHorizontal}) => {
    if(isHorizontal) return '30vw'
    return '45vw'
  }};
  height: ${({isEscolaridade}) => {
    if(isEscolaridade) return '82vh'
    return '40vh'
  }};
  display: flex;
  flex-direction: column;
  justify-content: end;
  border-radius: 15px;
  overflow: hidden;
  text-align: center;
  box-shadow: 8px 8px 5px rgba(0, 0, 0, 0.3);
  margin-top: ${({ isRacacor }) => {
    if(isRacacor == true) return '2rem'
  }};
  margin-bottom: ${({ isRacacor, isGraficoSexo }) => {
    if(isRacacor == true || isGraficoSexo == true ) return '2rem'
  }};

  p {
    ${({ theme }) => css`
      background: ${theme.font.background};
      color: ${theme.font.cores.white};
      font-size: ${theme.font.sizes.title_Graficos};
      padding: 1rem;
      font-weight: 600;
    `}
  }

  @media (max-width: 320px) {
    width:  100%;
    height: ${({isEscolaridade}) => {
      if(isEscolaridade) return '82vh'
      return '50vh'
    }};

    p{
      font-size: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    width:  100%;
    max-width: ${({ isHorizontal }) => {
      if(isHorizontal) return '100%'
      return '90% '
    }};
    height: ${({isEscolaridade }) => {
      if(isEscolaridade) return '104vh'
      return '50vh'
    }};

    max-height: ${({isEscolaridade }) => {
      if(isEscolaridade) return '104vh'
      return '50vh'
    }};

    p{
      font-size: 1.4rem;
    }

    margin-bottom: ${({ isEscolaridade }) => {
      if(isEscolaridade) return '0'
    }};
  }

  @media (max-width: 1024px) {
    width:  100%;
    max-width: ${({ isHorizontal }) => {
      if(isHorizontal) return '100%'
      return '90% '
    }};
    height: ${({isEscolaridade }) => {
      if(isEscolaridade) return '104vh'
      return '50vh'
    }};

    max-height: ${({isEscolaridade }) => {
      if(isEscolaridade) return '104vh'
      return '50vh'
    }};

    p{
      font-size: 1.4rem;
    }

    margin-bottom: ${({ isEscolaridade }) => {
      if(isEscolaridade) return '0'
    }};
  }
`
