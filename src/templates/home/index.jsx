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
import * as Styled from './styled'
import { TabelaOcupacao } from "../../components/tabela/tabela-ocupacao"
import { TabelaSubclasse } from "../../components/tabela/tabela-subclasse"
import { TabelaMunicipio } from "../../components/tabela/tabela-municipio"

export const Home = () => {

  const context = useContext(ContextGlobal)
  const [dados_graficoMensal, setDadosGraficoMensal] = useState([])
  const [dados_saldoGeral, setDadosSaldoGeral] = useState([])
  const [dados_saldoMpe, setDadosSaldoMpe] = useState([])
  const [ocupacao, setOcupacao] = useState([])
  const [municipio, setMunicipio] = useState([])
  const [subclasse, setSubclasse] = useState([])
  
  useEffect(() => {
    
    const dados_GraficoMensal = async () => {
      const response_graficoMensal = await get_dados_grafico_mensal(context)
      setDadosGraficoMensal(response_graficoMensal)
    }

    const getDadosOcupacao =async () => {
      const response = await getDadosGraficos('cbo2002ocupacao', context)
      setOcupacao(response)
    }

    const getDadosMunicipio =async () => {
      const response = await getDadosGraficos('municipio', context)
      setMunicipio(response)
    }

    const getDadosSubclasse =async () => {
      const response = await getDadosGraficos('subclasse', context)
      setSubclasse(response)
    }

    const getSaldoGeral = async () => {
      const response = await getDadosGraficos('saldo_geral', context)
      setDadosSaldoGeral(response.toLocaleString())
    }

    const getSaldoMpe = async () => {
      const response = await getDadosGraficos('saldo_mpe', context)
      setDadosSaldoMpe(response.toLocaleString())
    }

    // dadosGraficos()
    dados_GraficoMensal()
    getDadosOcupacao()
    getDadosMunicipio()
    getDadosSubclasse()
    getSaldoGeral()
    getSaldoMpe()
  }, [context])

  return <>
    <Header>
      <DataHeader />
    </Header>

    {municipio.length !== 0 && <Filtros />}

    {municipio.length !== 0 && <SaldoEmpregos
      saldo_geral={dados_saldoGeral}
      saldo_emppregos={dados_saldoMpe}
      />
    }

    {municipio.length && <Styled.ContainerGraficos>
        <GraficoMensal dados_grafico_mensal={dados_graficoMensal} />
        <Styled.ContainerGraficosClassificacao>
            <Styled.ContainerGraficosTipo>
              <LayoutPorteEmpresarial />
              <LayoutRacaCor />
              <LayoutGraficoSetor />
            </Styled.ContainerGraficosTipo>

            <Styled.ContainerGraficosHorizontal>
              <LayoutGraficoPorSexo 
                xAxisType="value"
                yAxisType="category"
              /> 
              <LayoutGraficoEscolaridade 
                xAxisType="value"
                yAxisType="category"
                />
              </Styled.ContainerGraficosHorizontal>
          </Styled.ContainerGraficosClassificacao>

        <Styled.ContainerTabelas>
            <TabelaOcupacao Titulo='Ocupação' dados={ocupacao} />
            <TabelaMunicipio Titulo='Município' dados={municipio} />
            <TabelaSubclasse Titulo='Subclasse' dados={subclasse} />
          </Styled.ContainerTabelas>
      </Styled.ContainerGraficos>
    }
  </>
}