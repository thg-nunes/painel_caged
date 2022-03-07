import * as Styled from './styled'

type Quantidade = {
  saldo_geral: number
  saldo_emppregos: number
}

export const SaldoEmpregos = ({ saldo_geral, saldo_emppregos }: Quantidade) => {

  console.log(saldo_geral, saldo_emppregos)

  return (
    <Styled.ContainerSaldoEmpregos>
      <Styled.QuantidadeSaldoEmpregos>
        <p>Saldo Geral de Empregos</p>
        <p>{saldo_geral}</p>
      </Styled.QuantidadeSaldoEmpregos>

      <Styled.QuantidadeSaldoEmpregos>
        <p>Saldo Empregos MPE`s</p>
        <p>{saldo_emppregos}</p>
      </Styled.QuantidadeSaldoEmpregos>
    </Styled.ContainerSaldoEmpregos>
  )
}
