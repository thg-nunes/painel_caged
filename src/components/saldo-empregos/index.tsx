import { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../contexts/context'
import { getDadosGraficos } from '../../services/pinot'
import './style.css'

export const SaldoEmpregos = () => {

  const context = useContext(ContextGlobal)
  const [dados_saldoGeral, setDadosSaldoGeral] = useState([])
  const [dados_saldoMpe, setDadosSaldoMpe] = useState([])

  useEffect(() => {

    let cancel_set = false

    const getSaldoGeral = async () => {
      const response = await getDadosGraficos('saldo_geral', context)
      if(cancel_set) return
      setDadosSaldoGeral(response.toLocaleString())
    }

    const getSaldoMpe = async () => {
      const response = await getDadosGraficos('saldo_mpe', context)
      console.log(response)
      if(cancel_set) return
      setDadosSaldoMpe(response.toLocaleString())
    }

    getSaldoGeral()
    getSaldoMpe()

    return () => { cancel_set = true }

  }, [context])

  return (
    <div className='containerSaldoEmpregos'>
      <div className='quantidadeSaldoEmpregos saldoGeral' >
        <p>Saldo Geral de Empregos</p>
        <p>{dados_saldoGeral}</p>
      </div>

      <div className='quantidadeSaldoEmpregos'>
        <p>Saldo Empregos MPE`s</p>
        <p>{dados_saldoMpe}</p>
      </div>
    </div>
  )
}
