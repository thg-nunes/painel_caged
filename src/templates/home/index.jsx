import { useContext, useEffect, useState } from "react"
import { DataHeader } from "../../components/dataHeader"
import { Filtros } from "../../components/Filtros"
import { GraficoMensal } from "../../components/graficos/mensal"
import { LayoutGraficoEscolaridade } from "../../components/graficos/all_graficos/grafico-escolaridade"
import { LayoutGraficoPorSexo } from "../../components/graficos/all_graficos/grafico-porSexo"
import { LayoutPorteEmpresarial } from "../../components/graficos/all_graficos/porte-empresarial"
import { LayoutRacaCor } from "../../components/graficos/all_graficos/raca-cor"
import { LayoutGraficoSetor } from "../../components/graficos/all_graficos/setor"
import { Header } from "../../components/header"
import { SaldoEmpregos } from "../../components/saldo-empregos"
import { ContextGlobal } from "../../contexts/context"
import { getDadosGraficos } from "../../services/pinot"
import { TabelaOcupacao } from "../../components/tabela/tabela-ocupacao"
import { TabelaSubclasse } from "../../components/tabela/tabela-subclasse"
import { TabelaMunicipio } from "../../components/tabela/tabela-municipio"
import Loading from '../../gifs/loading.gif'

import './style.css'

export const Home = () => {

  const context = useContext(ContextGlobal)
  const [ocupacao, setOcupacao] = useState([])
  const [municipio, setMunicipio] = useState([])
  const [subclasse, setSubclasse] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [scroll, setScroll] = useState('auto')
  
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

    <Filtros />
    <SaldoEmpregos />

    <section className="containerGraficos">
        <GraficoMensal />
        <div className="containerGraficosClassificacao">
          <section className="containerGraficosTipo">
            <LayoutPorteEmpresarial />
            <LayoutRacaCor />
            <LayoutGraficoSetor />
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
            <TabelaOcupacao Titulo='Ocupação' dados={ocupacao} />
            <TabelaMunicipio Titulo='Município' dados={municipio} />
            <TabelaSubclasse Titulo='Subclasse' dados={subclasse} />
          </section>
    </section>  
  </>
}