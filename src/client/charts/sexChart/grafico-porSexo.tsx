import Echarts from 'echarts-for-react'

import { PadraoGraficos } from '../../../interfaces/graficos/padrao-graficos'
import { EixoGrafico } from '../../../interfaces/graficos/eixos-grafico'
import { useMyQyery } from '../../../hooks/useMyQuery'
import { sexChartConfig } from './configChart'
import * as Styled from '../styled'

type Props = PadraoGraficos & EixoGrafico

export const LayoutSexChart = ({ yAxisType }: Props) => {

  const widthScreen = window.innerWidth
  const { data: sexData, isLoading } = useMyQyery('sexo')
  const option = sexChartConfig({ widthScreen, yAxisType, sexData })

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
