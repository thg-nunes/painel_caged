import React, { useContext, useEffect, useState } from 'react'
import Echarts from 'echarts-for-react'

import { ContextGlobal } from '../../contexts/context'
import { getDadosGraficos } from '../../services/pinot'
import { PadraoGraficos } from '../../interfaces/graficos/padrao-graficos'
import { EixoGrafico } from '../../interfaces/graficos/eixos-grafico'
import { Series } from '../../interfaces/graficos/series'
import * as Styled from './styled'

type Props = PadraoGraficos & EixoGrafico

export const LayoutGraficoSetor = ({ yAxisType }: Props) => {

  const context = useContext(ContextGlobal)
  const [dadosSetor, setDadosSetor] = useState<any[]>([])
  const [widthTela, setWidthTela] = useState<number>(0)

  useEffect(() => {

    let cancel_set = false;

    const getDadosSetor = async () => {
      const response = await getDadosGraficos('setor', context)
      if(cancel_set) return
      setDadosSetor(response)
    }

    const get_widthTela = () => {
      if(cancel_set) return
      setWidthTela(window.innerWidth)
    }

    getDadosSetor()
    get_widthTela()
    return () => {cancel_set = true}
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

  if(dadosSetor !== undefined){
    dadosSetor.forEach(arr => {
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
        fontSize: widthTela >= 320 && widthTela <= 768 ? 10 : 12
      },
      axisTick: {
        show: false
      },
      zlevel: 2,
      minInterval: widthTela >= 320 && widthTela <= 768 ? 20000 : 3000
    },
    yAxis: {
      type: 'category',
      data: dados_grafico_categoria ,
      axisLabel: {
        color: 'black',
        fontSize: widthTela >= 320 && widthTela <= 768 ? 9 : 11,
        fontWeight: widthTela >= 320 && widthTela <= 768 ? 'bold' : 'normal'
      },
      axisTick: {
        show: false
      },
      zlevel: 2
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
    <Styled.Container >
      <p>Empregos Por Setor</p>
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
