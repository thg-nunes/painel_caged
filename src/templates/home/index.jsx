import { AllFilters } from "../../client/create-filters"
import { GraficoMensal } from "../../client/charts/mensal"
import { Header } from "../../components/header"
import { CreateBalanceJobs } from "../../client/create-balance-jobs"
import { DataHeader } from "../../client/dataHeader"
import { CreateTable } from "../../components/tabela"
import { LayoutDefaultChart } from "../../components/chart"
import { LayoutSchoolingChart } from "../../client/charts/schoolingChart/shoolingChart"
import { LayoutSexChart } from "../../client/charts/sexChart/grafico-porSexo"
import { LayoutColorRaceChart } from "../../client/charts/colorRaceChart/colorRaceChart"
import Loading from '../../gifs/loading.gif'
import { useMyQyery } from "../../hooks/useMyQuery"

import './style.css'

export const Home = () => {

  const { data: cbo2002ocupacao } = useMyQyery('cbo2002ocupacao')
  const { data: municipio } = useMyQyery('municipio')
  const { data: subclasse, isLoading } = useMyQyery('subclasse')

  return <>
    <Header>
      <DataHeader />
    </Header>

    {isLoading &&
      <div className="content-loading">
        <img src={Loading} className="loading" alt="loading" />
      </div>
    }

    <AllFilters />
    <CreateBalanceJobs />

    <section className="containerGraficos">
        <GraficoMensal />
        <div className="containerGraficosClassificacao">
          <section className="containerGraficosTipo">
            <LayoutDefaultChart tipoGrafico='porte' titulo_grafico='Porte Empresarial'/>
            <LayoutColorRaceChart />
            <LayoutDefaultChart tipoGrafico='setor' titulo_grafico='Empregos Por Setor'/>
          </section>

          <section className="containerGraficosHorizontal">
            <LayoutSexChart
              xAxisType="value"
              yAxisType="category"
            />
            <LayoutSchoolingChart
              xAxisType="value"
              yAxisType="category"
              />
            </section>
        </div>

          <section className="containerTabelas">
            {cbo2002ocupacao && <CreateTable Titulo='Ocupa????o' dados={cbo2002ocupacao} />}
            {municipio && <CreateTable className='municipio' Titulo='Munic??pio' dados={municipio} />}
            {subclasse && <CreateTable Titulo='Subclasse' dados={subclasse} />}
          </section>
    </section>
  </>
}
