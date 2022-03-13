import React, { useContext, useEffect, useState } from 'react'
import Echarts from 'echarts-for-react'

import * as Styled from './styled'
import { ContextGlobal } from '../../../contexts/context'
import { getDadosFiltros } from '../../../services/pinot'

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

export const LayoutGraficoEscolaridade = ({ yAxisType }: Props) => {

  const context = useContext(ContextGlobal)
  const [dadosEscolaridade, setDadosEscolaridade] = useState<any[]>([])
  const [widthTela, setWidthTela] = useState<number>(0)

  useEffect(() => {
    const getDadosEscolaridade = async () => {
      const response = await getDadosFiltros('graudeinstrucao', context)
      setDadosEscolaridade(response)
    }

    const get_widthTela = () => {
      setWidthTela(window.innerWidth)
    }

    getDadosEscolaridade()
    get_widthTela()
  }, [context])

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

  if(dadosEscolaridade !== undefined){
    dadosEscolaridade.forEach(arr => {
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
      position: yAxisType ? 'right' : 'top',
      fontSize: widthTela >= 320 && widthTela <= 768 ? 10 : 11,
      rotate:  0
    },
    xAxis: {
      type: 'value',
      data: dados_grafico_categoria_quantidade,
      axisLabel: {
        color: 'black',
        fontSize: widthTela >= 320 && widthTela <= 768 ? 10 : 11,
        fontWeight: widthTela >= 320 && widthTela <= 768 ? 'bold' : 'normal',
        rotate: widthTela >= 768 && widthTela <= 1024 ? 30 : 0
      },
      minInterval: widthTela >= 320 && widthTela <= 768 ? 30000 : 20000
    },
    yAxis: {
      type: 'category',
      data: dados_grafico_categoria,
      axisLabel: {
        color: 'black',
        fontSize: widthTela >= 320 && widthTela <= 768 ? 9 : 11,
        fontWeight: widthTela >= 320 && widthTela <= 768 ? 'bold' : 'normal'
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        data: dados_grafico_categoria_quantidade,
        type: 'bar',
        barWidth: '40%',
      },
    ],
  }

  return (
    <Styled.Container isEscolaridade isHorizontal >
      <p>Empregos Por Escolaridade</p>
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
