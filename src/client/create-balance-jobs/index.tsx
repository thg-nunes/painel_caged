import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { BalanceJobs } from '../../components/balance-jobs'
import { ContextGlobal } from '../../contexts/context'
import { getDadosGraficos } from '../../services/pinot'
import './style.css'

export const CreateBalanceJobs = () => {

  const context = useContext(ContextGlobal)

  const { data: dados_saldoGeral } = useQuery(['saldo_geral', context], async () => {
    const response = await getDadosGraficos('saldo_geral', context)
    return response.toLocaleString()
  }, {
    staleTime: 1000 * 60 * 10 // 10 minutes
  })

  const { data: dados_saldoMpe } = useQuery(['saldo_mpe', context], async () => {
    const response = await getDadosGraficos('saldo_mpe', context)
    return response.toLocaleString()
  }, {
    staleTime: 1000 * 60 * 10 // 10 minutes
  })

  return (
    <div className='containerSaldoEmpregos'>
      <BalanceJobs textDescription='Saldo Geral de Empregos' quantityValue={dados_saldoGeral} isGeneralBalance='saldoGeral'/>
      <BalanceJobs textDescription='Saldo Empregos MPE`s' quantityValue={dados_saldoMpe}/>
    </div>
  )
}
