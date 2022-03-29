import Echarts from 'echarts-for-react'
import { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../../contexts/context'
import { getDadosGraficos } from '../../../services/pinot'
import './style.css'

export const GraficoMensal = () => {

  const context = useContext(ContextGlobal)
  const [allMeses] = useState<string[]>(['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'])
  const [mesesQuantidadeDados, setMesesQuantidadeDados] = useState<number[]>([])
  const [dadosMensal, setDadosMensal] = useState<any[]>([])
  const [marginBottomGrafico, setMarginBottomGrafico] = useState<string>('')
  const [marginRightGrafico, setMarginRightGrafico] = useState<string>('')
  const [widthTela, setWidthTela] = useState<number>(0)

  useEffect(() => {

    let cancel_set = false

    const getDadosMensal = async () => {
      const response = await getDadosGraficos('data', context)

      const meses_com_dados: string[] = []
      const quantidade_dados_meses: number[] = []

      if(response.length !== 0) {
        for (let i = 0; i < response.length; i++) {
          meses_com_dados.push(allMeses[i])  
          quantidade_dados_meses.push(response[0][1])        
        }
      }
      
      setMesesQuantidadeDados(quantidade_dados_meses)
      setDadosMensal(response)
    }
    
    const tamanhoTela = () => {
      if(window.innerWidth > 1366) setMarginBottomGrafico('18%')
      if(window.innerWidth >= 1024 || window.innerWidth <= 1366) {
        if(cancel_set) return
        setMarginBottomGrafico('20%')
        setMarginRightGrafico('10%')
      }

      if(window.innerWidth >=  768 || window.innerWidth <= 1024) {
        if(cancel_set) return
        setMarginBottomGrafico('20%')
        setMarginRightGrafico('15%')
      }
    }

      const get_widthTela = () => {
        if(cancel_set) return
        setWidthTela(window.innerWidth)
      }

    getDadosMensal()
    tamanhoTela()
    get_widthTela()

    return () => {cancel_set = true}
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
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
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
      width: widthTela >= 320 && widthTela <= 768 ? '90%' : '95%',
      top: '10%',
      left: '1%',
      right: marginRightGrafico,
      bottom: widthTela == 768 ? '22%' : marginBottomGrafico,
    },
    label: {
      show: mesesQuantidadeDados.length == 1 ? true : false,
      fontWeight: mesesQuantidadeDados.length == 1 ? 'bold' : null
    },
    xAxis: {
      type: 'category',
      data: context.state.data == '' ? ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'] : [context.state.data[0].mes],
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
        data: valores_colunas.length == 12 ? valores_colunas : mesesQuantidadeDados,
        type: mesesQuantidadeDados.length > 1 ? 'line' : 'bar',
        barMaxWidth: '45%',
        color: '#0374F0',
        smooth: true,
      },
    ],
  }

  return (
    <div className='estiloGraficoMensal'>
      <h2>Histórico de Empregos</h2>
      <Echarts
        option={option}
        opts={{ renderer: 'canvas' }}
        style={{
          width: widthTela >= 320 && widthTela <= 768 ? '150vw' : '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
