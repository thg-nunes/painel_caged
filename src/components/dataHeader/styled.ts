import styled, { css } from 'styled-components'

export const Data = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    max-width: 1366px;
    height: 100%;
    margin: auto;
    padding: 1rem 0;
  `}

  .logo {
    width: 50px;
    border-radius: 5px;
  }

  .menu-mobile {
    display: none;
  }

  .texto-header {
    font-weight: 600;
    ${({ theme }) => css`
      font-size: ${theme.font.sizes.default};
    `}
  }
  
  @media (max-width: 1024px) {
    .texto-header {
      font-size: 1.9rem;
    }
  }
  
    @media (max-width: 768px) {
      .texto-header {
        font-size: 1.7rem;
      }
    }

  @media (max-width: 320px) {
    .texto-header {
      font-size: 1.3rem;
    }

    .logo {
      display: none;
    }

    .menu-mobile {
      display: block;
    }
  }

  
`
