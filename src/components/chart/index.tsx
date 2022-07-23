import Echarts from 'echarts-for-react'

import { PadraoGraficos } from '../../interfaces/graficos/padrao-graficos'
import { EixoGrafico } from '../../interfaces/graficos/eixos-grafico'
import { useMyQyery } from '../../hooks/useMyQuery'
import { configToChart } from './configChart'

import * as Styled from './styled'

type Props = PadraoGraficos & EixoGrafico

export const LayoutDefaultChart = ({ yAxisType, tipoGrafico, titulo_grafico }: Props) => {

  const { data: dataChart } = useMyQyery(tipoGrafico)

  const widthScreen = window.innerWidth
  const option = configToChart({yAxisType, dataChart, widthScreen})

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
