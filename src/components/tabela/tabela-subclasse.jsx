import { useMemo } from 'react'
import { useTable } from 'react-table'
import './style.css'

export const TabelaSubclasse = ({ dados, Titulo }) => {

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

  const instancia_tabela = useTable({
    columns,
    data,
  })

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = instancia_tabela

  return (
    <div className='stylesTables'>
      <h2 className='tituloTables'>{Titulo}</h2>
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
          {rows.map((row) => {
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
    </div>
  )
}
