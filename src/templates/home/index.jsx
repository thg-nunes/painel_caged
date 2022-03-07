import { useContext, useEffect, useState } from "react"
import { DataHeader } from "../../components/dataHeader"
import { Filtros } from "../../components/Filtros"
import { GraficoMensal } from "../../components/graficos/mensal"
import { LayoutPadraoGraficos } from "../../components/graficos/padrao"
import { Header } from "../../components/header"
import { SaldoEmpregos } from "../../components/saldo-empregos"
import { Tabela } from "../../components/tabela"
import { ContextGlobal } from "../../contexts/context"
import { getDadosGraficos, getFiltros, get_dados_grafico_mensal } from "../../services/pinot"
import * as Styled from './styled'

export const Home = () => {

  const context = useContext(ContextGlobal)
  const [filtros, setFiltros] = useState([])
  const [dados_graficos, setDadosGraficos] = useState([])
  const [dados_graficoMensal, setDadosGraficoMensal] = useState([])
  
  useEffect(() => {
    
    const querys_filtros = ['uf', 'municipio', 'porte', 'cbo2002ocupacao', 'setor', 'racacor', 'graudeinstrucao', 'sexo', 'subclasse']
    
    const columns_dataBase = ['mes', 'uf', 'municipio', 'porte', 'cbo2002ocupacao', 'setor', 'racacor', 'graudeinstrucao', 'sexo', 'subclasse', 'as_saldo', 'as_mpe']

    const getAllFiltros = async () => {
      const response_getFIltros = await getFiltros(querys_filtros)
      setFiltros(response_getFIltros)
    } 

    const dadosGraficos = async () => {
      const response_dadosGraficos = await getDadosGraficos(columns_dataBase, context)
      setDadosGraficos(response_dadosGraficos)
    } 

    const dados_GraficoMensal = async () => {
      const response_graficoMensal = await get_dados_grafico_mensal(context)
      setDadosGraficoMensal(response_graficoMensal)
    }

    getAllFiltros()
    dadosGraficos()
    dados_GraficoMensal()
  }, [context])

  return <>
    <Header>
      <DataHeader />
    </Header>

    {filtros.length !== 0 && <Filtros filtros={filtros} />}

    {dados_graficos.length !== 0 && <SaldoEmpregos
      saldo_geral={dados_graficos[10].valor[0].toLocaleString()}
      saldo_emppregos={dados_graficos[11].valor[0].toLocaleString()} />
    }

    <Styled.ContainerGraficos>
        {dados_graficoMensal.length !== 0 && <GraficoMensal dados_grafico_mensal={dados_graficoMensal} /> }
        {dados_graficos.length !== 0 && <Styled.ContainerGraficosClassificacao>
            <Styled.ContainerGraficosTipo>
              <LayoutPadraoGraficos
                className='grafico-tipo'
                titulo_grafico="Porte Empresarial"
                data={dados_graficos[3].valor}
              />
              <LayoutPadraoGraficos
                titulo_grafico="Empregos Por Raça e Cor"
                data={dados_graficos[6].valor}
              />
              <LayoutPadraoGraficos
                titulo_grafico="Empregos por Setor"
                data={dados_graficos[5].valor}
              />
            </Styled.ContainerGraficosTipo>

            <Styled.ContainerGraficosHorizontal>
              <LayoutPadraoGraficos
                titulo_grafico="Empregos Por Sexo"
                xAxisType="value"
                yAxisType="category"
                data={dados_graficos[8].valor}
              />
              <LayoutPadraoGraficos
                isEscolaridade={true}
                titulo_grafico="Empregos Por Escolaridade"
                xAxisType="value"
                yAxisType="category"
                data={dados_graficos[7].valor}
                tipoGrafico={dados_graficos[7].grafico}
              />
            </Styled.ContainerGraficosHorizontal>
          </Styled.ContainerGraficosClassificacao>
  	    }

        {dados_graficos.length !== 0 && <Styled.ContainerTabelas>
            <Tabela Titulo='Ocupação' dados={dados_graficos[4].valor} />
            <Tabela Titulo='Município' dados={dados_graficos[2].valor} />
            <Tabela Titulo='Subclasse' dados={dados_graficos[9].valor} />
          </Styled.ContainerTabelas>
        }
        </Styled.ContainerGraficos>

  </>
}