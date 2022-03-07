import React from 'react'
import Echarts from 'echarts-for-react'

import * as Styled from './styled'

type PadraoGraficos = {
  titulo_grafico: string
  data?: any[]
  isEscolaridade?: boolean
  tipoGrafico?: string
  className?: string
}

type EixoGrafico = {
  xAxisType?: string
  yAxisType?: string
}

type Props = PadraoGraficos & EixoGrafico

type Series = {
  value: number
  itemStyle: {
    color: string
  }
}

export const LayoutPadraoGraficos = ({ titulo_grafico, data, xAxisType, yAxisType, tipoGrafico }: Props) => {
  const colecao_cores = [
    '#FFBE7D',
    '#5B9F51',
    '#9fcbe8',
    '#F7B538',
    '#108BA8',
    '#D57195',
    '#F28E2C',
    '#11A896',
    '#B6982C',
    '#525174',
    '#3B6065',
  ]

  const dados_grafico_categoria: string[] = []
  const dados_grafico_categoria_quantidade: Series[] = []
  const quantidade_colunas: number[] = []

  if(data !== undefined){
      data.forEach(arr => {
      dados_grafico_categoria.push(arr[0])
      quantidade_colunas.push(arr[1])
    })
  }

  for (let i = 0; i < quantidade_colunas.length; i++) {
    dados_grafico_categoria_quantidade.push({
      value: quantidade_colunas[i],
      itemStyle: { color: colecao_cores[i] },
    })
  }

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      containLabel: true,
      width: yAxisType ? '85%' : '95%',
      top: yAxisType ? '5%' : '10%',
      left: '1%',
      right: '1%',
      bottom: '5%',
    },
    label: {
      show: true,
      color: 'rgb(0, 0, 0)',
      fontWeight: 'bold',
      position: yAxisType ? 'right' : 'top'
    },
    xAxis: {
      type: xAxisType ? xAxisType : 'category',
      data: xAxisType ? dados_grafico_categoria_quantidade : dados_grafico_categoria ,
      axisLabel: {
        color: 'black',
        fontSize: 10
      },
    },
    yAxis: {
      type: yAxisType ? yAxisType : 'value',
      data: yAxisType ? dados_grafico_categoria : dados_grafico_categoria_quantidade,
      axisLabel: {
        color: 'black',
      },
    },
    series: [
      {
        data: dados_grafico_categoria_quantidade,
        type: 'bar',
        barWidth: '40%',
      },
    ],
  }

  const is_escolaridade = tipoGrafico !== undefined ? true :false

  return (
    <Styled.Container isEscolaridade={is_escolaridade} titulo={titulo_grafico}>
      <p>{titulo_grafico}</p>
      <Echarts
        className='grafito-tipo'
        option={option}
        opts={{ renderer: 'canvas' }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Styled.Container>
  )
}
