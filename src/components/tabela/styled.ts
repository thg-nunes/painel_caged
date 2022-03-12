import styled from 'styled-components'

export const TituloTables = styled.h2`
  background: #0A6F89;
  text-align: center;
  padding: 1rem;
  color: white;

  @media (max-width: 320px) {
    font-size: 1.8rem;
    position: sticky;
    top: 0;
  }
`

export const StylesTables = styled.div`
  display: flex;
  flex-direction: column;
  width: 24vw;
  height: 80vh;
  overflow: hidden;
  overflow-y: scroll;

  border-radius: 15px;
  margin-bottom: 4rem;

  box-shadow: 8px 8px 5px rgba(0, 0, 0, 0.3);

  table {
    width: 100%;
    height: 100%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      font-size: 1.5rem;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0.5rem;
  }

  .pagination span {
    font-size: 1.5rem;
  }

  .pagination button {
    margin: 0 .5rem;
    padding: 0 .5rem;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 320px) {
    width: 100%;
    flex-direction: column;
    max-height: 80vh;

    table {
      th,
      td {
        font-size: 1.1rem;
      }
    }
  }
`