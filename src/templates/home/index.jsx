import { useContext, useEffect, useState } from "react"
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

import './style.css'

export const Home = () => {

  const context = useContext(ContextGlobal)
  const [ocupacao, setOcupacao] = useState([])
  const [municipio, setMunicipio] = useState([])
  const [subclasse, setSubclasse] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {

    let cancel_set = false
    
    const getDadosOcupacao =async () => {
      const response = await getDadosGraficos('cbo2002ocupacao', context)
        if(cancel_set) return
        setOcupacao(response)
    }

    const getDadosMunicipio =async () => {
      const response = await getDadosGraficos('municipio', context)
      if(cancel_set) return   
      setMunicipio(response)
    }

    const getDadosSubclasse =async () => {
      const response = await getDadosGraficos('subclasse', context)
      if(cancel_set) return
      setSubclasse(response)
      setIsLoading(false)
      window.document.body.style.overflow = "auto"
      window.document.body.scroll({top: 0})
    }
    
    const set_states = () => {
      setIsLoading(true)
    }

    window.document.body.style.overflow = "hidden"

    getDadosOcupacao()
    getDadosMunicipio()
    getDadosSubclasse()
    set_states()
    return () => cancel_set = true
  }, [context])

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
            <CreateTable Titulo='Ocupação' dados={ocupacao} />
            <CreateTable className='municipio' Titulo='Município' dados={municipio} />
            <CreateTable Titulo='Subclasse' dados={subclasse} />
          </section>
    </section>  
  </>
}