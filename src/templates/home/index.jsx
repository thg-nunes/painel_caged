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
import { Tabela } from "../../components/tabela"
import { ContextGlobal } from "../../contexts/context"
import { getDadosGraficos, get_dados_grafico_mensal } from "../../services/pinot"
import * as Styled from './styled'

export const Home = () => {

  const context = useContext(ContextGlobal)
  const [dados_graficos, setDadosGraficos] = useState([])
  const [dados_graficoMensal, setDadosGraficoMensal] = useState([])
  
  useEffect(() => {
    
    const columns_dataBase = ['mes', 'uf', 'municipio', 'porte', 'cbo2002ocupacao', 'setor', 'racacor', 'graudeinstrucao', 'sexo', 'subclasse', 'as_saldo', 'as_mpe']

    const dadosGraficos = async () => {
      const response_dadosGraficos = await getDadosGraficos(columns_dataBase, context)
      setDadosGraficos(response_dadosGraficos)
    } 

    const dados_GraficoMensal = async () => {
      const response_graficoMensal = await get_dados_grafico_mensal(context)
      setDadosGraficoMensal(response_graficoMensal)
    }

    dadosGraficos()
    dados_GraficoMensal()
  }, [context])

  return <>
    <Header>
      <DataHeader />
    </Header>

    {dados_graficos .length !== 0 && <Filtros />}

    {dados_graficos.length !== 0 && <SaldoEmpregos
      saldo_geral={dados_graficos[10].valor[0].toLocaleString()}
      saldo_emppregos={dados_graficos[11].valor[0].toLocaleString()} />
    }

    {dados_graficos.length && <Styled.ContainerGraficos>
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
            <Tabela Titulo='Ocupação' dados={dados_graficos[4].valor} />
            <Tabela Titulo='Município' dados={dados_graficos[2].valor} />
            <Tabela Titulo='Subclasse' dados={dados_graficos[9].valor} />
          </Styled.ContainerTabelas>
      </Styled.ContainerGraficos>
    }
  </>
}