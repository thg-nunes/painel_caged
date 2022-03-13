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
    width: 130px;
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

  @media (max-width: 320px) {
    .texto-header {
      font-size: 1.2rem;
    }

    .logo {
      display: none;
    }

    .menu-mobile {
      display: block;
    }
  }

  @media (max-width: 768px) {
    .texto-header {
      font-size: 1.7rem;
    }
  }
`
