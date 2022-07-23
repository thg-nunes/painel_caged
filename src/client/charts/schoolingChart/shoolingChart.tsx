import Echarts from 'echarts-for-react'

import { PadraoGraficos } from '../../../interfaces/graficos/padrao-graficos'
import { EixoGrafico } from '../../../interfaces/graficos/eixos-grafico'
import { useMyQyery } from '../../../hooks/useMyQuery'
import { schoolingChartConfig } from './configChart'

import * as Styled from '../styled'

type Props = PadraoGraficos & EixoGrafico

export const LayoutSchoolingChart = ({ yAxisType }: Props) => {

  const widthScreen = window.innerWidth
  const { data: schoolingData } = useMyQyery('graudeinstrucao')
  const option = schoolingChartConfig({yAxisType, widthScreen, schoolingData})

  return (
    <Styled.Container isEscolaridade isHorizontal >
      <p>Empregos Por Escolaridade</p>
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
