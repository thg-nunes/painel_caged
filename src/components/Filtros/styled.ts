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

    .close-menu {
      display: none;
    }

    @media (max-width: 320px) {
      display: none;    
      width: 80%;
      height: 100vh;
      right: 0;
      margin-top: 0;
      position: fixed;
      z-index: 10;
      border: none;

      transition: all .25ms;

      overflow-y: scroll;
      padding-bottom: 8rem;

      background: white;

      .texto-filtros {
        display: none;
      }

      .close-menu{
        display: block;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 50%;

        position: absolute;
        right: 0;
        margin: .5rem;
        margin-right: 1.8rem;
      }

      section {
        overflow: auto;
      }
      section p {
        margin: 0;
      }

      section::-webkit-progress-bar{
        display: none;
      }

      .searchBox::placeholder {
        color: black;
        overflow-x: hidden;
      }
    }
  `
  export const ContainerMultiSelect = styled.div`
    display: flex;
    flex-flow: wrap;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 0.8rem;

    & section {
      width: 16%;
      height: 50px;
      min-width: 100px;
      padding: 0 0.5rem;
    }

    @media (max-width: 320px) {
      p {
        font-size: 1.3rem;
        margin: .5rem 0;
      }

      section {
        margin: .5rem 0;
        margin-right: .5rem;
        max-width: 100%;
        padding: 0;
      }
    }

    @media (max-width: 768px) {
      display: flex;
      & section {
        max-width: 30%;
        margin-bottom: .5rem;

        background: white;
        p {
          font-size: 1.3rem;
        }
      }
      & section div:first-child {
        background: white;
      }
    }
  `
