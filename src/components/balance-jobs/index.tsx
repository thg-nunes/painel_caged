type DataToBalanceComponent = {
  textDescription: string
  quantityValue: number
  isGeneralBalance?: string
}

export const BalanceJobs = ({quantityValue = 0, textDescription, isGeneralBalance = ''}:DataToBalanceComponent) => {

  return (
    <div className={`quantidadeSaldoEmpregos ${isGeneralBalance !== '' ? isGeneralBalance : null}`}>
      <p>{textDescription}</p>
      <p>{quantityValue.toLocaleString()}</p>
    </div>
  )
}
