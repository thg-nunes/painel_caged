import styled from 'styled-components'

export const ContainerGraficos = styled.section`
  width: 80%;
  max-width: 1366px;
  margin: auto;
  margin-bottom: 5rem;
  border-radius: 15px;
`
export const ContainerGraficosClassificacao = styled.div`
  width: 100%;
  max-width: 1366px;
  display: flex;
  justify-content: space-between;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 320px) {
    flex-direction: column;
  }
`
export const ContainerGraficosTipo = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ContainerGraficosHorizontal = styled(ContainerGraficosTipo)`
  width: 60%;
  height: 100%;
  
  @media (max-width: 320px) {
    width: 100%;
    margin-top: 3rem;
  }
`
export const ContainerTabelas = styled(ContainerGraficosTipo)`
  margin-top: 4rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 320px) {
    flex-direction: column;
  }
`
