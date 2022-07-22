import { useContext, useEffect, useState } from 'react'
import Echarts from 'echarts-for-react'

import { ContextGlobal } from '../../contexts/context'
import { getDadosGraficos } from '../../services/pinot'
import { PadraoGraficos } from '../../interfaces/graficos/padrao-graficos'
import { EixoGrafico } from '../../interfaces/graficos/eixos-grafico'
import { Series } from '../../interfaces/graficos/series'
import * as Styled from './styled'
import { useQuery } from '@tanstack/react-query'

type Props = PadraoGraficos & EixoGrafico

export const LayoutGraficoPorSexo = ({ yAxisType }: Props) => {

  const context = useContext(ContextGlobal)
  const [widthTela, setWidthTela] = useState<number>(0)

  const { data: dataSexo, isLoading } = useQuery(['sexo', context], async () => {
    const response = await getDadosGraficos('sexo', context)
    return response
  }, {
    staleTime: 1000 * 60 * 10 // 10 minutes
  })

  useEffect(() => {

    let cancel_set = false;
    const get_widthTela = () => {
      if(cancel_set) return
      setWidthTela(window.innerWidth)
    }

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

  if(!isLoading && dataSexo){
    dataSexo.forEach(arr => {
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
      width: yAxisType ? '85%' : '95%',
      top: '10%',
      left: '1%',
      right: '1%',
      bottom: '5%',
    },
    label: {
      show: true,
      color: 'rgb(0, 0, 0)',
      fontWeight: 'bold',
      position: yAxisType ? 'right' : 'top',
      fontSize: widthTela >= 320 && widthTela <= 768 ? 10 : 12
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: 'black',
        fontSize: widthTela >= 320 && widthTela <= 768 ? 9 : 12,
        fontWeight: widthTela >= 320 && widthTela <= 768 ? 'bold' : 'normal',
      },
      zlevel: 2,
      minInterval: widthTela >= 320 && widthTela <= 768 ? 10000 : null
    },
    yAxis: {
      type: 'category' ,
      data: dados_grafico_categoria,
      axisLabel: {
        color: 'black',
        fontSize: widthTela >= 320 && widthTela <= 768 ? 10 : 12,
        fontWeight: widthTela >= 320 && widthTela <= 768 ? 'bold' : 'normal'
      },
      axisTick: {
        show: widthTela >= 320 && widthTela <= 768 ? false : true
      },
      zlevel: 2,
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
    <Styled.Container isGraficoSexo isHorizontal>
      <p>Empregos Por Sexo</p>
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
