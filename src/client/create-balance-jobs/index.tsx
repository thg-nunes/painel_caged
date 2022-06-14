import { useContext, useEffect, useState } from 'react'
import { BalanceJobs } from '../../components/balance-jobs'
import { ContextGlobal } from '../../contexts/context'
import { getDadosGraficos } from '../../services/pinot'
import './style.css'

export const CreateBalanceJobs = () => {

  const context = useContext(ContextGlobal)
  const [dados_saldoGeral, setDadosSaldoGeral] = useState<number>(0)
  const [dados_saldoMpe, setDadosSaldoMpe] = useState<number>(0)

  useEffect(() => {

    let cancel_set = false

    const getSaldoGeral = async () => {
      const response = await getDadosGraficos('saldo_geral', context)
      if(cancel_set) return
      setDadosSaldoGeral(response.toLocaleString())
    }

    const getSaldoMpe = async () => {
      const response = await getDadosGraficos('saldo_mpe', context)
      if(cancel_set) return
      setDadosSaldoMpe(response.toLocaleString())
    }

    getSaldoGeral()
    getSaldoMpe()

    return () => { cancel_set = true }
    
  }, [context])

  return (
    <div className='containerSaldoEmpregos'>
      <BalanceJobs textDescription='Saldo Geral de Empregos' quantityValue={dados_saldoGeral} isGeneralBalance='saldoGeral'/>
      <BalanceJobs textDescription='Saldo Empregos MPE`s' quantityValue={dados_saldoMpe}/>
    </div>
  )
}
