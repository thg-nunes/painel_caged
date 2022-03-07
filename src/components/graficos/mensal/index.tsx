import Echarts from 'echarts-for-react'
import * as Sttyle from './styled'

type TypeQuantidade = {
  dados_grafico_mensal: {
    resultTable: {
      rows: string | number[]
    }
  }
}

export const GraficoMensal = ({ dados_grafico_mensal }: TypeQuantidade) => {

  const valores_colunas: number[] = []
  if(dados_grafico_mensal !== undefined) {
    for (let i = 0; i < dados_grafico_mensal.resultTable.rows.length; i++) {
      valores_colunas.push(dados_grafico_mensal.resultTable.rows[i][1])
    }
  }

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      containLabel: true,
      width: '98%',
      top: '10%',
      left: '1%',
      right: '0',
      bottom: '18%',
    },
    xAxis: {
      type: 'category',
      data: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
      axisLabel: {
        color: 'black',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'black',
      },
    },
    series: [
      {
        data: valores_colunas,
        type: 'line',
        smooth: true,
      },
    ],
  }

  return (
    <Sttyle.EstiloGraficoMensal>
      <h2>Histórico de Empregos</h2>
      <Echarts
        option={option}
        opts={{ renderer: 'canvas' }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Sttyle.EstiloGraficoMensal>
  )
}
