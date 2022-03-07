import styled from 'styled-components'

export const ContainerSaldoEmpregos = styled.div`
  width: 80%;
  max-width: 1366px;
  display: flex;
  justify-content: space-around;

  margin: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
`

export const QuantidadeSaldoEmpregos = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 15px;
  overflow: hidden;

  box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.2);

  & p:first-child {
    font-size: 2rem;
    width: 100%;
    padding: 1rem 0;
    color: white;
    text-align: center;
    background: #076f89;
    font-weight: 600;
  }

  & p:last-child {
    width: 100%;
    text-align: center;
    font-size: 5rem;
    font-weight: 400;
    padding: 2rem 0;
  }
`
