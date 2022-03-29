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
import { getDadosGraficos, get_dados_grafico_mensal } from "../../services/pinot"
import { TabelaOcupacao } from "../../components/tabela/tabela-ocupacao"
import { TabelaSubclasse } from "../../components/tabela/tabela-subclasse"
import { TabelaMunicipio } from "../../components/tabela/tabela-municipio"

import './style.css'

export const Home = () => {

  const context = useContext(ContextGlobal)
  const [dados_graficoMensal, setDadosGraficoMensal] = useState([])
  const [ocupacao, setOcupacao] = useState([])
  const [municipio, setMunicipio] = useState([])
  const [subclasse, setSubclasse] = useState([])
  
  useEffect(() => {

    let cancel_set = false
    
    const dados_GraficoMensal = async () => {
      const response_graficoMensal = await get_dados_grafico_mensal(context)
        if(cancel_set) return
        setDadosGraficoMensal(response_graficoMensal)
    }

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
    }

    dados_GraficoMensal()
    getDadosOcupacao()
    getDadosMunicipio()
    getDadosSubclasse()

    return () => cancel_set = true
  }, [context])

  return <>
    <Header>
      <DataHeader />
    </Header>

    <Filtros />
    <SaldoEmpregos />

    <section className="containerGraficos">
        <GraficoMensal dados_grafico_mensal={dados_graficoMensal} />
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