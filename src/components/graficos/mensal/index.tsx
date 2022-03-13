import Echarts from 'echarts-for-react'
import { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../../contexts/context'
import { getDadosFiltros } from '../../../services/pinot'
import * as Sttyle from './styled'

export const GraficoMensal = () => {

  const context = useContext(ContextGlobal)
  const [dadosMensal, setDadosMensal] = useState<any[]>([])
  const [marginBottomGrafico, setMarginBottomGrafico] = useState<string>('')
  const [marginRightGrafico, setMarginRightGrafico] = useState<string>('')
  const [widthTela, setWidthTela] = useState<number>(0)

  useEffect(() => {
    const getDadosMensal = async () => {
      const response = await getDadosFiltros('data', context)
      setDadosMensal(response)
    }
    
    const tamanhoTela = () => {
      if(window.innerWidth > 1366) setMarginBottomGrafico('18%')
      if(window.innerWidth >= 1024 || window.innerWidth <= 1366) {
        setMarginBottomGrafico('20%')
        setMarginRightGrafico('10%')
      }

      if(window.innerWidth >=  768 || window.innerWidth <= 1024) {
        setMarginBottomGrafico('20%')
        setMarginRightGrafico('15%')
      }
    }

    const get_widthTela = () => {
      setWidthTela(window.innerWidth)
    }

    getDadosMensal()
    tamanhoTela()
    get_widthTela()
  }, [context])

  const valores_colunas: number[] = []
  if(dadosMensal !== undefined) {
    for (let i = 0; i < dadosMensal.length; i++) {
      valores_colunas.push(dadosMensal[i][1])
    }
  }

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      containLabel: true,
      width: widthTela >= 320 && widthTela <= 768 ? '90%' : '98%',
      top: '10%',
      left: '1%',
      right: marginRightGrafico,
      bottom: widthTela == 768 ? '22%' : marginBottomGrafico,
    },
    xAxis: {
      type: 'category',
      data: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
      axisLabel: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: widthTela >= 320 && widthTela <= 768 ? 10 : 12
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: widthTela >= 320 && widthTela <= 768 ? 9 : 12
      },
    },
    series: [
      {
        data: valores_colunas,
        type: 'line',
        color: '#0374F0',
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
          width: widthTela >= 320 && widthTela < 768 ? '150vw' : '100%',
          maxWidth: '95%',
          height: '100%',
        }}
      />
    </Sttyle.EstiloGraficoMensal>
  )
}
