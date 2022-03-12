import { Multiselect } from 'multiselect-react-dropdown'
import * as Styled from './styled'
import * as actions from '../../contexts/actions'
import { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../contexts/context'
import {
  getDadosFiltrosUF, getDadosFiltrosMunicipio, getDadosFiltrosPorte, getDadosFiltrosOcupacao, getDadosFiltrosSetor, getDadosFiltrosRacaCor, getDadosFiltrosGaudeInstrucao, getDadosFiltrosSexo, getDadosFiltrosSubclasse
} from '../../services/pinot'

export const Filtros = () => {

  const context = useContext(ContextGlobal)
  const [filtrosAnual, setFiltrosAnual] = useState([])
  const [filtrosMensal, setFiltrosMensal] = useState([])
  const [filtrosUf, setFiltrosUf] = useState([])
  const [filtrosMunicipio, setFiltrosMunicipio] = useState([])
  const [filtrosPorte, setFiltrosPorte] = useState([])
  const [filtrosOcupacao, setFiltrosOcupacao] = useState([])
  const [filtrosSetor, setFiltrosSetor] = useState([])
  const [filtrosRacaCor, setFiltrosRacaCor] = useState([])
  const [filtrosGrauInstrucao, setFiltrosGrauInstrucao] = useState([])
  const [filtrosPorSexo, setFiltrosPorSexo] = useState([])
  const [filtrosSubclasse, setFiltrosSubclasse] = useState([])

  const constroi_filtros = (arr_filtros, filtro) => { 
    let filtros_modificados = []

    for (let index = 0; index < arr_filtros.length; index++) {
      filtros_modificados.push({
        value: filtro,
        label: arr_filtros[index][0]
      })
    }
    return filtros_modificados
  }
  
  useEffect(() => {

    const getFiltrosUf = async () => {
      const response_getFIltrosUf = await getDadosFiltrosUF()
      const filtros_validos = constroi_filtros(response_getFIltrosUf.resultTable.rows, 'uf')
      setFiltrosUf(filtros_validos)
    } 
    
    const getFiltrosMunicipio = async () => {
      const response_getFIltrosMunicipio = await getDadosFiltrosMunicipio(context.state.uf)
      const filtros_validos = constroi_filtros(response_getFIltrosMunicipio.resultTable.rows, 'municipio')
      setFiltrosMunicipio(filtros_validos)
    }

    const getFiltrosPorte = async () => {
      const response_getFIltrosPorte = await getDadosFiltrosPorte()
      const filtros_validos = constroi_filtros(response_getFIltrosPorte.resultTable.rows, 'porte')
      setFiltrosPorte(filtros_validos)
    }

    const getFiltrosOcupacao = async () => {
      const response_getFIltrosOcupacao = await getDadosFiltrosOcupacao()
      const filtros_validos = constroi_filtros(response_getFIltrosOcupacao.resultTable.rows, 'cbo2002ocupacao')
      setFiltrosOcupacao(filtros_validos)
    }

    const getFiltrosSetor = async () => {
      const response_getFIltrosSetor = await getDadosFiltrosSetor()
      const filtros_validos = constroi_filtros(response_getFIltrosSetor.resultTable.rows, 'setor')
      setFiltrosSetor(filtros_validos)
    }

    const getFiltrosRacacor = async () => {
      const response_getFIltrosRacacor = await getDadosFiltrosRacaCor()
      const filtros_validos = constroi_filtros(response_getFIltrosRacacor.resultTable.rows, 'racacor')
      setFiltrosRacaCor(filtros_validos)
    }

    const getFiltrosGrauInstrucao = async () => {
      const response_getFIltrosGrauInstrucao = await getDadosFiltrosGaudeInstrucao()
      const filtros_validos = constroi_filtros(response_getFIltrosGrauInstrucao.resultTable.rows, 'graudeinstrucao')
      setFiltrosGrauInstrucao(filtros_validos)
    }

    const getFiltrosPorSexo = async () => {
      const response_getFIltrosPorSexo = await getDadosFiltrosSexo()
      const filtros_validos = constroi_filtros(response_getFIltrosPorSexo.resultTable.rows, 'sexo')
      setFiltrosPorSexo(filtros_validos)
    }

    const getFiltrosSubclasse = async () => {
      const response_getFIltrosSubclasse = await getDadosFiltrosSubclasse()
      const filtros_validos = constroi_filtros(response_getFIltrosSubclasse.resultTable.rows, 'subclasse')
      setFiltrosSubclasse(filtros_validos)
    }

    const filtros_meses = () => {
      let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      let filtromensal = []
    
      for (let i = 0; i < meses.length; i++) {
        filtromensal.push({
          value:'data',
          label: meses[i]
        })
      }

      setFiltrosMensal(filtromensal)
    }

    const filtros_ano = () => {
      let ano_disponiveis = []

      for (let i = 2020; i <= context.state.ano; i++) {
        ano_disponiveis.push({
          value: 'ano',
          label: i
        })
      }

      setFiltrosAnual(ano_disponiveis)
    }

    getFiltrosUf()
    getFiltrosMunicipio()
    getFiltrosPorte()
    getFiltrosOcupacao()
    getFiltrosSetor()
    getFiltrosRacacor()
    getFiltrosGrauInstrucao()
    getFiltrosPorSexo()
    getFiltrosSubclasse() 
    filtros_meses()
    filtros_ano()
  }, [context])

  return (
    <Styled.ContainerFiltros id='all_filters'>
      <p className="texto-filtros">Filtros:</p>
      <svg className='close-menu' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"
        onClick={() => {
          document.getElementById('all_filters').style.display = 'none'
        }}
      ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
      <Styled.ContainerMultiSelect>
        <section>
          <p>Ano:</p>
          <Multiselect
            className="multiselect"
            displayValue="label"
            onRemove={(e) => context.dispatch({type: actions.MUDAR_ANO, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_ANO, payload: {filtros_selecionados: e}})}
            placeholder='Selecionar'
            options={filtrosAnual}
          />
        </section>
        <section>
          <p>Mês:</p>
          <Multiselect
            className="multiselect"
            displayValue="label"
            onRemove={(e) => context.dispatch({type: actions.MUDAR_MES, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_MES, payload: {filtros_selecionados: e}})}
            placeholder='Selecionar'
            options={filtrosMensal}
          />
        </section>

        <section>
          <p>UF</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onRemove={(e) => context.dispatch({type: actions.MUDAR_ESTADO, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_ESTADO, payload: {filtros_selecionados: e}})}
            placeholder='Selecionar'
            options={filtrosUf}
          />
        </section>

        <section>
          <p>Município</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onRemove={(e) => context.dispatch({type: actions.MUDAR_MUNICIPIO, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_MUNICIPIO, payload: {filtros_selecionados: e}})}
            placeholder='Selecionar'
            options={filtrosMunicipio}
          />
        </section>

      <section>
          <p>Porte</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onRemove={(e) => context.dispatch({type: actions.MUDAR_PORTE, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_PORTE, payload: {filtros_selecionados: e}})}
            placeholder='Selecionar'
            options={filtrosPorte}
          />
        </section>

      <section>
          <p>Ocupação</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onRemove={(e) => context.dispatch({type: actions.cbo2002ocupacao, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.cbo2002ocupacao, payload: {filtros_selecionados: e}})}
            placeholder='Selecionar'
            options={filtrosOcupacao}
          />
        </section>
      </Styled.ContainerMultiSelect>

      <Styled.ContainerMultiSelect>
        <section>
          <p>Setor</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onRemove={(e) => context.dispatch({type: actions.MUDAR_SETOR, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_SETOR, payload: {filtros_selecionados: e}})}
            options={filtrosSetor}
          />
        </section>

        <section>
          <p>Raça/Cor</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onRemove={(e) => context.dispatch({type: actions.MUDAR_RACACOR, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_RACACOR, payload: {filtros_selecionados: e}})}
            options={filtrosRacaCor}
          />
        </section>

        <section>
          <p>Grau de Instrução</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onRemove={(e) => context.dispatch({type: actions.MUDAR_GRAUINSTRUCAO, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_GRAUINSTRUCAO, payload: {filtros_selecionados: e}})}
            options={filtrosGrauInstrucao}
          />
        </section>

        <section>
          <p>Sexo</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onRemove={(e) => context.dispatch({type: actions.MUDAR_SEXO, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_SEXO, payload: {filtros_selecionados: e}})}
            options={filtrosPorSexo}
          />
        </section>

        <section>
          <p>Subclasse</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onRemove={(e) => context.dispatch({type: actions.MUDAR_SUBCLASSE, payload: {filtros_selecionados: e}})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_SUBCLASSE, payload: {filtros_selecionados: e}})}
            options={filtrosSubclasse}
          />
        </section>

      </Styled.ContainerMultiSelect>
    </Styled.ContainerFiltros>
  )
}
