import { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Echarts from 'echarts-for-react'

import { ContextGlobal } from '../../contexts/context'
import { getDadosGraficos } from '../../services/pinot'
import { PadraoGraficos } from '../../interfaces/graficos/padrao-graficos'
import { EixoGrafico } from '../../interfaces/graficos/eixos-grafico'
import { Series } from '../../interfaces/graficos/series'
import * as Styled from './styled'

type Props = PadraoGraficos & EixoGrafico

export const LayoutDefaultChart = ({ yAxisType, tipoGrafico, titulo_grafico }: Props) => {

  const context = useContext(ContextGlobal)
  const [widthTela, setWidthTela] = useState<number>(0)

  const { data: dataChart } = useQuery([tipoGrafico, context],async () => {
    const response = await getDadosGraficos(tipoGrafico, context)
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

    // getDataChart()
    get_widthTela()
    return () => {cancel_set = true}
  }, [context])

  const colorsColection = [
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

  const dataChartCategory: string[] = []
  const dataChartCategoryQuantity: Series[] = []
  const quantityColumns: number[] = []

  if(dataChart !== undefined){
    dataChart.forEach(arr => {
      dataChartCategory.push(arr[0])
      quantityColumns.push(arr[1])
    })
  }

  for (let i = 0; i < quantityColumns.length; i++) {
    dataChartCategoryQuantity.push({
      value: quantityColumns[i],
      itemStyle: { color: colorsColection[i] },
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
      data: dataChartCategoryQuantity,
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
      data: dataChartCategory ,
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
        data: dataChartCategoryQuantity,
        color: '#0374F0',
        type: 'bar',
        barWidth: '40%',
      },
    ],
  }

  return (
    <Styled.Container>
      <p>{titulo_grafico}</p>
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
