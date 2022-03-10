import { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'

import * as Styles from './styled'

export const TabelaOcupacao = ({ dados, Titulo }) => {

  const dados_tabela = []

  useMemo(() => {
    dados.forEach(arr => {
      dados_tabela.push({
        campo: arr[0],
        valor: arr[1].toLocaleString()
      })
    })
  }, [dados])

  const COLUMNS = [
    {Header: Titulo, accessor: 'campo'},
    {Header: 'Saldo', accessor: 'valor'}
  ]

  const columns = useMemo(() => COLUMNS,[])

  const data = useMemo(() => dados_tabela ,[dados])

  let [stateButton, setStateButtonPrevious] = useState(undefined)
  let [stateButtonNext, setStateButtonNext] = useState(undefined)

  const instancia_tabela = useTable({
    columns,
    data,
  }, usePagination)

  const {getTableProps, getTableBodyProps, headerGroups, page, state, prepareRow, nextPage, previousPage, canPreviowsPage, canNextPage, setPageSize, pageOptions} = instancia_tabela

  useEffect(() => {
    setPageSize(50)
  },[setPageSize])

  const {pageIndex} = state 

  return (
    <Styles.StylesTables>
      <Styles.TituloTables>{Titulo}</Styles.TituloTables>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps() }>{cell.render('Cell')} </td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <span>{pageIndex + 1}/{pageOptions.length}</span>
        <button onClick={() => {
          previousPage()
          if(pageIndex == pageOptions.length) setStateButtonPrevious(!canPreviowsPage)
          if(pageIndex == pageOptions.length) setStateButtonPrevious(canPreviowsPage)
        }} disabled={stateButton} > <strong>{'<'}</strong> </button>
        <button onClick={() => {
          nextPage()
          if(pageIndex == pageOptions.length) setStateButtonNext(!canPreviowsPage)
          if(pageIndex == pageOptions.length) setStateButtonNext(canPreviowsPage)
        }} disabled={stateButtonNext}><strong>{'>'}</strong></button>
      </div>
    </Styles.StylesTables>
  )
}
