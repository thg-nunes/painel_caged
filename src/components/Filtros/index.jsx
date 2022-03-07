import { Multiselect } from 'multiselect-react-dropdown'

import * as Styled from './styled'
import * as actions from '../../contexts/actions'
import { useContext } from 'react'
import { ContextGlobal } from '../../contexts/context'

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

  console.log(filtros_superior)

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
          <p>{filtros_superior[0][0].value}</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            // onKeyPressFn={function noRefCheck() {}}
            // onRemove={function noRefCheck() {}}
            // onSearch={function noRefCheck() {}}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_ESTADO, payload: {filtros_selecionados: e}})}
            options={filtros_superior[0]}
          />
        </section>

        <section>
          <p>{filtros_superior[1][0].value}</p>
          <Multiselect
            className="multiselect"
            displayValue='label'
            // onKeyPressFn={function noRefCheck() {}}
            // onRemove={function noRefCheck() {}}
            // onSearch={function noRefCheck() {}}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_MUNICIPIO, payload: {filtros_selecionados: e}})}
            options={filtros_superior[1]}
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
