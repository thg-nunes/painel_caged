import Echarts from 'echarts-for-react'

import { PadraoGraficos } from '../../../interfaces/graficos/padrao-graficos'
import { EixoGrafico } from '../../../interfaces/graficos/eixos-grafico'
import { colorRaceChartConfig } from './configChart'
import { useMyQyery } from '../../../hooks/useMyQuery'
import * as Styled from '../styled'

type Props = PadraoGraficos & EixoGrafico

export const LayoutColorRaceChart = ({ yAxisType }: Props) => {

  const { data: colorRaceData } = useMyQyery('racacor')
  const widthScreen = window.innerWidth
  const option = colorRaceChartConfig({ colorRaceData, yAxisType, widthScreen })

  return (
    <Styled.Container isRacacor >
      <p>Empregos Por Raça/Cor</p>
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
