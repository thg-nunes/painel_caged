import { BalanceJobs } from '../../components/balance-jobs'
import { useMyQyery } from '../../hooks/useMyQuery'
import './style.css'

export const CreateBalanceJobs = () => {

  const { data: dados_saldoGeral } = useMyQyery('saldo_geral')
  const { data: dados_saldoMpe } = useMyQyery('saldo_mpe')

  return (
    <div className='containerSaldoEmpregos'>
      <BalanceJobs textDescription='Saldo Geral de Empregos' quantityValue={dados_saldoGeral} isGeneralBalance='saldoGeral'/>
      <BalanceJobs textDescription='Saldo Empregos MPE`s' quantityValue={dados_saldoMpe}/>
    </div>
  )
}
