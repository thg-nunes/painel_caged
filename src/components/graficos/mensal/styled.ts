import styled from 'styled-components'

export const EstiloGraficoMensal = styled.div`
  height: 42vh;
  max-height: 400px;
  box-shadow: 7px 7px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  border-radius: 15px;
  overflow: hidden;

  & h2 {
    text-align: center;
    background: #076f89;

    padding: 1rem 0;
    color: white;
  }

  @media (max-width: 320px) {
    overflow-x: scroll;
    h2 {
      position: sticky;
      left: 0;
      font-size: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    height: 45vh;
    overflow-x: scroll;

    h2 {
      position: sticky;
      left: 0;
      font-size: 1.6rem;
    }
  }

  @media (max-width: 1024px) {
    height: 50vh;
    overflow-x: scroll;

    h2 {
      position: sticky;
      left: 0;
      font-size: 1.7rem;
    }
  }

  @media (max-width: 1366px) {
    height: 50vh;

    h2 {
      position: sticky;
      left: 0;
      font-size: 2rem;
    }
  }
`
