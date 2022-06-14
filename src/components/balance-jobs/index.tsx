type DataToBalanceComponent = {
  textDescription: string
  quantityValue: number
  isGeneralBalance?: string
}

export const BalanceJobs = ({quantityValue, textDescription, isGeneralBalance = ''}:DataToBalanceComponent) => {

  return (
    <div className={`quantidadeSaldoEmpregos ${isGeneralBalance !== '' ? isGeneralBalance : null}`}>
      <p>{textDescription}</p>
      <p>{quantityValue}</p>
    </div>
  )
}
