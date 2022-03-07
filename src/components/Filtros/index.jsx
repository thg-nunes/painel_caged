import { Multiselect } from 'multiselect-react-dropdown'

import * as Styled from './styled'
import * as actions from '../../contexts/actions'
import { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../contexts/context'
import {
  getDadosFiltrosUF, getDadosFiltrosMunicipio, getDadosFiltrosPorte, getDadosFiltrosOcupacao, getDadosFiltrosSetor, getDadosFiltrosRacaCor, getDadosFiltrosGaudeInstrucao, getDadosFiltrosSexo, getDadosFiltrosSubclasse
} from '../../services/pinot'

export const Filtros = ({ filtros }) => {

  
  let filtros_superior = []
  let filtros_inferior = []
  
  for (let i = 0; i < filtros.length; i++) {
    if(i < 4) {
      filtros_superior.push(filtros[i])
    }
    else if (i >= 4) filtros_inferior.push(filtros[i])
  }
  
  const context = useContext(ContextGlobal)

  const [filtrosUf, setFiltrosUf] = useState(undefined)
  const [filtrosMunicipio, setFiltrosMunicipio] = useState(undefined)
  const [filtrosPorte, setFiltrosPorte] = useState(undefined)
  const [filtrosOcupacao, setFiltrosOcupacao] = useState(undefined)
  const [filtrosSetor, setFiltrosSetor] = useState(undefined)
  const [filtrosRacacor, setFiltrosRacacor] = useState(undefined)
  const [filtrosGrauInstrucao, setFiltrosGrauInstrucao] = useState(undefined)
  const [filtrosPorSexo, setFiltrosPorSexo] = useState(undefined)
  const [filtrosPorSubclasse, setFiltrosPorSubclasse] = useState(undefined)

  useEffect(() => {

    const filtros_uf = async () => {
      const response = await getDadosFiltrosUF()
      const response_padrao = [{
        value: 'uf',
        label: response.resultTable.rows[0]
      }]
      setFiltrosUf(response_padrao)
    }
    
    const filtros_municipio = async () => {
      const response = await getDadosFiltrosMunicipio()

      let allMunicipios = []

      response.resultTable.rows.forEach(municipio => {
        allMunicipios.push({
          value: 'uf',
          label: municipio
        })
      })

      if(allMunicipios.length !== 0) setFiltrosMunicipio(allMunicipios)
    }

    const filtros_porte = async () => {
      const response = await getDadosFiltrosPorte()
      setFiltrosPorte(response)
    }

    const filtros_ocupacao = async () => {
      const response = await getDadosFiltrosOcupacao()
      setFiltrosOcupacao(response)
    }

    const filtros_setor = async () => {
      const response = await getDadosFiltrosSetor()
      setFiltrosSetor(response)
    }

    const filtros_racacor = async () => {
      const response = await getDadosFiltrosRacaCor()
      setFiltrosRacacor(response)
    }

    const filtros_instrucao = async () => {
      const response = await getDadosFiltrosGaudeInstrucao()
      setFiltrosGrauInstrucao(response)
    }

    const filtros_por_sexo = async () => {
      const response = await getDadosFiltrosSexo()
      setFiltrosPorSexo(response)
    }

    const filtros_subclasse = async () => {
      const response = await getDadosFiltrosSubclasse()
      setFiltrosPorSubclasse(response)
    }

    filtros_uf()
    filtros_municipio()
    filtros_porte()
    filtros_ocupacao()
    filtros_setor()
    filtros_racacor()
    filtros_instrucao()
    filtros_por_sexo()
    filtros_subclasse()
  }, [])  


  return (
    <Styled.ContainerFiltros>
      <p className="texto-filtros">Filtros:</p>
      <Styled.ContainerMultiSelect>
        <section>
          <p>Ano:</p>
          <Multiselect
            className="multiselect"
            displayValue="key"
            // onKeyPressFn={function noRefCheck() {}}
            // onRemove={function noRefCheck() {}}
            // onSearch={function noRefCheck() {}}
            // onSelect={function noRefCheck() {}}
            // options={dadosFiltros.Meses}
          />
        </section>
        <section>
          <p>Mês:</p>
          <Multiselect
            className="multiselect"
            displayValue="key"
            // onKeyPressFn={function noRefCheck() {}}
            // onRemove={function noRefCheck() {}}
            // onSearch={function noRefCheck() {}}
            // onSelect={function noRefCheck() {}}
            // options={dadosFiltros.Meses}
          />
        </section>
 
        <section>
          <p>UF</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            // onKeyPressFn={function noRefCheck() {}}
            // onRemove={function noRefCheck() {}}
            // onSearch={function noRefCheck() {}}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_ESTADO, payload: {filtros_selecionados: e}})}
            options={filtrosUf}
          />
        </section>

        <section>
          <p>Municipio</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            // onKeyPressFn={function noRefCheck() {}}
            // onRemove={function noRefCheck() {}}
            // onSearch={function noRefCheck() {}}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_MUNICIPIO, payload: {filtros_selecionados: e}})}
            options={filtrosMunicipio}
          />
        </section>

       <section>
          <p>{filtros_superior[2][0].value}</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            // onKeyPressFn={function noRefCheck() {}}
            // onRemove={function noRefCheck() {}}
            // onSearch={function noRefCheck() {}}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_PORTE, payload: {filtros_selecionados: e, filtro:filtros_superior[2].value}})}
            options={filtros_superior[2]}
          />
        </section>

       <section>
          <p>ocupação</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            // onKeyPressFn={function noRefCheck() {}}
            // onRemove={function noRefCheck() {}}
            // onSearch={function noRefCheck() {}}
            onSelect={(e) => context.dispatch({type: actions.cbo2002ocupacao, payload: {filtros_selecionados: e, filtro:filtros_superior[3].value}})}
            options={filtros_superior[3]}
          />
        </section>
      </Styled.ContainerMultiSelect>
 
      <Styled.ContainerMultiSelect>
        <section>
          <p>{filtros_inferior[0][0].value}</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onSelect={(e) => context.dispatch({type: actions.MUDAR_SETOR, payload: {filtros_selecionados: e}})}
            options={filtros_inferior[0]}

          />
        </section>

        <section>
          <p>raça/cor</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onSelect={(e) => context.dispatch({type: actions.MUDAR_RACACOR, payload: {filtros_selecionados: e}})}
            options={filtros_inferior[1]}
          />
        </section>

        <section>
          <p>grau de instrução</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onSelect={(e) => context.dispatch({type: actions.MUDAR_GRAUINSTRUCAO, payload: {filtros_selecionados: e}})}
            options={filtros_inferior[2]}
          />
        </section>

        <section>
          <p>{filtros_inferior[3][0].value}</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onSelect={(e) => context.dispatch({type: actions.MUDAR_SEXO, payload: {filtros_selecionados: e}})}
            options={filtros_inferior[3]}
          />
        </section>

        <section>
          <p>{filtros_inferior[4][0].value}</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            onSelect={(e) => context.dispatch({type: actions.MUDAR_SUBCLASSE, payload: {filtros_selecionados: e}})}
            options={filtros_inferior[4]}
          />
        </section>

      </Styled.ContainerMultiSelect>
    </Styled.ContainerFiltros>
  )
}
