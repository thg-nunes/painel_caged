import { useContext } from "react"
import { AllFilters } from "../../client/create-filters"
import { GraficoMensal } from "../../client/charts/mensal"
import { LayoutGraficoEscolaridade } from "../../client/charts/grafico-escolaridade"
import { LayoutGraficoPorSexo } from "../../client/charts/grafico-porSexo"
import { LayoutRacaCor } from "../../client/charts/raca-cor"
import { Header } from "../../components/header"
import { CreateBalanceJobs } from "../../client/create-balance-jobs"
import { ContextGlobal } from "../../contexts/context"
import { getDadosGraficos } from "../../services/pinot"
import { DataHeader } from "../../client/dataHeader"
import { CreateTable } from "../../components/tabela"
import { LayoutDefaultChart } from "../../components/chart"
import Loading from '../../gifs/loading.gif'
import { useQuery } from "@tanstack/react-query"

import './style.css'

export const Home = () => {

  const context = useContext(ContextGlobal)

  const { data: cbo2002ocupacao } = useQuery(['cbo2002ocupacao', context], async () => {
    const response = await getDadosGraficos('cbo2002ocupacao', context)
    return response
  }, {
    staleTime: 1000 * 60 * 10 // 10 minutes
  })

  const { data: municipio } = useQuery(['municipio', context], async () => {
    const response = await getDadosGraficos('municipio', context)
    return response
  }, {
    staleTime: 1000 * 60 * 10 // 10 minutes
  })

  const { data: subclasse, isLoading } = useQuery(['subclasse', context], async () => {
    const response = await getDadosGraficos('subclasse', context)
    
    window.document.body.style.overflow = "auto"
    window.document.body.scroll({top: 0})
    
    return response
  }, {
    staleTime: 1000 * 60 * 10 // 10 minutes
  })
    
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
            <LayoutRacaCor />
            <LayoutDefaultChart tipoGrafico='setor' titulo_grafico='Empregos Por Setor'/>
          </section> 

          <section className="containerGraficosHorizontal">
            <LayoutGraficoPorSexo 
              xAxisType="value"
              yAxisType="category"
            /> 
            <LayoutGraficoEscolaridade 
              xAxisType="value"
              yAxisType="category"
              />
            </section>
        </div>

          <section className="containerTabelas">
            {cbo2002ocupacao && <CreateTable Titulo='Ocupação' dados={cbo2002ocupacao} />}
            {municipio && <CreateTable className='municipio' Titulo='Município' dados={municipio} />}
            {subclasse && <CreateTable Titulo='Subclasse' dados={subclasse} />}
          </section>
    </section>  
  </>
}