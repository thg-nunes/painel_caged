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

  .texto-header {
    font-weight: 600;
    ${({ theme }) => css`
      font-size: ${theme.font.sizes.default};
    `}
  }
`
