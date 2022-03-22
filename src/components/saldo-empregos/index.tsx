import './style.css'

type Quantidade = {
  saldo_geral: number
  saldo_emppregos: number
}

export const SaldoEmpregos = ({ saldo_geral, saldo_emppregos }: Quantidade) => {

  return (
    <div className='containerSaldoEmpregos'>
      <div className='quantidadeSaldoEmpregos saldoGeral' >
        <p>Saldo Geral de Empregos</p>
        <p>{saldo_geral}</p>
      </div>

      <div className='quantidadeSaldoEmpregos'>
        <p>Saldo Empregos MPE`s</p>
        <p>{saldo_emppregos}</p>
      </div>
    </div>
  )
}
