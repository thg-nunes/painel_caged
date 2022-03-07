import styled from 'styled-components'

export const ContainerGraficos = styled.section`
  width: 80%;
  max-width: 1366px;
  height: 300vh;
  border: 1px solid;
  margin: auto;
  border-radius: 15px;
`
export const ContainerGraficosClassificacao = styled.div`
  width: 100%;
  max-width: 1366px;
  display: flex;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
`
export const ContainerGraficosTipo = styled.section`
  display: flex;
  flex-direction: column;
  width: 110vw;
`

export const ContainerGraficosHorizontal = styled(ContainerGraficosTipo)`
  width: 90%;
  height: 100%;
  padding-left: 2rem;
`
export const ContainerTabelas = styled(ContainerGraficosTipo)`
  margin-top: 4rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
