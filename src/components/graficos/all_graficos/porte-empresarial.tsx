import React, { useContext, useEffect, useState } from 'react'
import Echarts from 'echarts-for-react'

import * as Styled from './styled'
import { ContextGlobal } from '../../../contexts/context'
import { getDadosGraficos } from '../../../services/pinot'

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

export const LayoutPorteEmpresarial = ({ yAxisType }: Props) => {

  const context = useContext(ContextGlobal)
  const [dadosPorte, setDadosPorte] = useState<any[]>([])
  const [widthTela, setWidthTela] = useState<number>(0)

  useEffect(() => {
    const getDadosMensal = async () => {
      const response = await getDadosGraficos('porte', context)
      setDadosPorte(response)
    }

    const get_widthTela = () => {
      setWidthTela(window.innerWidth)
    }

    getDadosMensal()
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

  if(dadosPorte !== undefined){
    dadosPorte.forEach(arr => {
      if(widthTela >= 320 && widthTela <= 768) dados_grafico_categoria.push(arr[0].replace(' ', '\n'))
      else dados_grafico_categoria.push(arr[0])
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
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      itemSize: widthTela >= 768 && widthTela <= 1024 ? 11 : 12,
      showTitle: true,
      feature: {
        type: "png",
        saveAsImage: {
          show: true,
          title: ' ',
          iconStyle: {
            borderWidth: 1.5,
          },
        },
        magicType: { 
          show: true,
          title: ' ',
          type: ['line'],
          iconStyle: {
            borderWidth: 1.5,
          },
        },
        restore: {
          show: true,
          title: ' ',
          iconStyle: {
            borderWidth: 1.5,
          },
        },
      },
    },
    grid: {
      containLabel: true,
      width: '85%',
      top: yAxisType ? '5%' : '10%',
      left: '4%',
      right: '1%',
      bottom: '5%',
    },
    label: {
      show: true,
      color: 'rgb(0, 0, 0)',
      fontWeight: 'bold',
      position: 'right',
      fontSize: widthTela >= 320 && widthTela <= 768 ? 10 : 12
    },
    xAxis: {
      type: 'value',
      data: dados_grafico_categoria_quantidade,
      axisLabel: {
        color: 'black',
        fontWeight: widthTela >= 320 && widthTela <= 768 ? 'bold' : 'normal',
        fontSize: widthTela >= 320 && widthTela <= 768 ? 9 : 12
      },
      axisTick: {
        show: false
      },
      minInterval: (widthTela >= 320 && widthTela <= 768) ? 30000 : null
    },
    yAxis: {
      type: 'category',
      data: dados_grafico_categoria ,
      axisLabel: {
        color: 'black',
        fontSize: widthTela >= 320 && widthTela <= 768 ? 9 : 10,
        fontWeight: widthTela >= 320 && widthTela <= 768 ? 'bold' : 'normal',
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        data: dados_grafico_categoria_quantidade,
        color: '#0374F0',
        type: 'bar',
        barWidth: '40%',
      },
    ],
  }

  return (
    <Styled.Container>
      <p>Porte Empresarial</p>
      <Echarts
        className='grafito-tipo'
        option={option}
        opts={{ renderer: 'canvas' }}
        style={{
          width: '98%',
          height: '100%',
        }}
      />
    </Styled.Container>
  )
}
