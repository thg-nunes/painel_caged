import styled from 'styled-components'

export const ContainerFiltros = styled.div`
  width: 80%;
  max-width: 1366px;
  border: 1px solid #208cc9;
  display: grid;
  grid-template-rows: 1fr 1fr;
  margin: auto;
  margin-top: 2rem;
  position: relative;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);

  .texto-filtros {
    margin: 0;
    padding: 0 0.5rem;

    position: absolute;

    top: -1rem;
    color: #208cc9;
    font-weight: 600;

    margin-left: 2rem;

    background: #fff;
    width: min-content;
  }
`
export const ContainerMultiSelect = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 0.8rem;

  & section {
    width: 100%;
    height: 50px;
    max-width: 250px;
    padding: 0 0.5rem;
  }
`
