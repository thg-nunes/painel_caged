import { useContext, useEffect, useState } from 'react'
import { Multiselect } from 'multiselect-react-dropdown'

import * as actions from '../../contexts/actions'
import { Filter } from '../../components/filter'
import { ContextGlobal } from '../../contexts/context'
import { getDadosGraficos, getDataFilter } from '../../services/pinot'

import './style.css'

export const AllFilters = () => {

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
  const [infor, setInfor] = useState(false)

  const constroi_filtros = (arr_filtros, filtro) => {
    let filtros_modificados = []

    for (let index = 0; index < arr_filtros.length; index++) {
      filtros_modificados.unshift({
        value: filtro,
        label: arr_filtros[index][0]
      })
    }
    return filtros_modificados
  }

  useEffect(() => {

    const getFiltrosUf = async () => {
      const response_getFIltrosUf = await getDataFilter(context, 'uf')
      const filtros_validos = constroi_filtros(response_getFIltrosUf.resultTable.rows, 'uf')
      setFiltrosUf(filtros_validos)
    }

    const getFiltrosMunicipio = async () => {
      if(context.state.uf !== '') {
        const response_getFIltrosMunicipio = await getDataFilter(context, 'municipio')
        const filtros_validos = constroi_filtros(response_getFIltrosMunicipio.resultTable.rows, 'municipio')
        setFiltrosMunicipio(filtros_validos)
      }
    }

    const getFiltrosPorte = async () => {
      const response_getFIltrosPorte = await getDataFilter(context, 'porte')
      const filtros_validos = constroi_filtros(response_getFIltrosPorte.resultTable.rows, 'porte')
      setFiltrosPorte(filtros_validos)
    }

    const getFiltrosOcupacao = async () => {
      const response_getFIltrosOcupacao = await getDataFilter(context, 'cbo2002ocupacao')
      const filtros_validos = constroi_filtros(response_getFIltrosOcupacao.resultTable.rows, 'cbo2002ocupacao')
      setFiltrosOcupacao(filtros_validos)
    }

    const getFiltrosSetor = async () => {
      const response_getFIltrosSetor = await getDataFilter(context, 'setor')
      const filtros_validos = constroi_filtros(response_getFIltrosSetor.resultTable.rows, 'setor')
      setFiltrosSetor(filtros_validos)
    }

    const getFiltrosRacacor = async () => {
      const response_getFIltrosRacacor = await getDataFilter(context, 'racacor')
      const filtros_validos = constroi_filtros(response_getFIltrosRacacor.resultTable.rows, 'racacor')
      setFiltrosRacaCor(filtros_validos)
    }

    const getFiltrosGrauInstrucao = async () => {
      const response_getFIltrosGrauInstrucao = await getDataFilter(context, 'graudeinstrucao')
      const filtros_validos = constroi_filtros(response_getFIltrosGrauInstrucao.resultTable.rows, 'graudeinstrucao')
      setFiltrosGrauInstrucao(filtros_validos)
    }

    const getFiltrosPorSexo = async () => {
      const response_getFIltrosPorSexo = await getDataFilter(context, 'sexo')
      const filtros_validos = constroi_filtros(response_getFIltrosPorSexo.resultTable.rows, 'sexo')
      setFiltrosPorSexo(filtros_validos)
    }

    const getFiltrosSubclasse = async () => {
      const response_getFIltrosSubclasse = await getDataFilter(context, 'subclasse')
      const filtros_validos = constroi_filtros(response_getFIltrosSubclasse.resultTable.rows, 'subclasse')
      setFiltrosSubclasse(filtros_validos)
    }

    const filtros_meses = () => {
      const allMonths = ['Janeiro', 'Fevereiro', 'Mar??o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      const allValidMonths = []

      if(context.state.ano < new Date().getFullYear()) {
        allMonths.forEach((month, index) => {
          allValidMonths.push({
            value: index + 1,
            label: month
          })
        })
      } else {
        for (let monthIndex = 0; monthIndex <= new Date().getMonth(); monthIndex++) {
          allValidMonths.push({
            label: allMonths[monthIndex],
            value: monthIndex + 1
          })
        }
      }
      setFiltrosMensal(allValidMonths)
    }

    const filtros_ano = () => {
      let ano_disponiveis = []

      const year = new Date().getMonth() >= 2 && new Date().getDate() >= 1 ? new Date().getFullYear() : new Date().getFullYear() - 1

      for (let i = 2020; i <= year; i++) {
        ano_disponiveis.unshift({
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
    <div className='containerFiltros' id='all_filters'>
      <p className="text-filters">Filtros:</p>
      <div className='containerMultiSelect'>
        <Filter
          descriptionFilter='Ano'
          otherClassNameToMultiselectComponent='multiselect'
          actionType={actions.MUDAR_ANO}
          placeholder={context.state.ano}
          showCheckbox={false}
          singleSelect={true}
          options={filtrosAnual}
        />
        <section className='container-filter'>
          <p>
            M??s
            {
              <span
                className='infor'
                onMouseOver={() => setInfor(true)}
                onMouseOut={() => setInfor(false)}
              >?</span>
            }
            {infor && (
              <span className='text-infor'>Ao selecionar 2 meses, os resultados ser??o baseados no intervalo entre eles.</span>
            )}
          </p>
          <Multiselect
            className="multiselect filter"
            displayValue='label'
            onRemove={(e) => context.dispatch({type: actions.MUDAR_MES, payload: e})}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_MES, payload: e})}
            placeholder='Selecionar'
            selectionLimit={2}
            options={filtrosMensal}
            showCheckbox
          />
        </section>
        <section className='container-filter'>
          <p>UF</p>
          <Multiselect
            singleSelect={true}
            className="multiselect multiselect-uf filter"
            displayValue='label'
            onRemove={(e) => {
              context.dispatch({type: actions.MUDAR_ESTADO, payload: e})
              context.dispatch({type: actions.MUDAR_MUNICIPIO, payload: []})
            }}
            onSelect={(e) => context.dispatch({type: actions.MUDAR_ESTADO, payload: e})}
            placeholder='Selecionar'
            options={filtrosUf}
            selectedValues={[
              {value: 'uf', label: 'Maranh??o'}
            ]}
          />
        </section>
        <Filter
          descriptionFilter='Munic??pio'
          otherClassNameToSectionTag='multiselect'
          actionType={actions.MUDAR_MUNICIPIO}
          options={filtrosMunicipio}
        />
        <Filter
          descriptionFilter='Porte'
          otherClassNameToSectionTag='multiselect'
          actionType={actions.MUDAR_PORTE}
          options={filtrosPorte}
        />
        <Filter
          descriptionFilter='Ocupa????o'
          otherClassNameToSectionTag='multiselect'
          actionType={actions.cbo2002ocupacao}
          options={filtrosOcupacao}
        />
      </div>

      <div className='containerMultiSelect bottom' isFiltrosBottom>
        <Filter
          descriptionFilter='Setor'
          otherClassNameToMultiselectComponent='multiselect'
          actionType={actions.MUDAR_SETOR}
          options={filtrosSetor}
        />
        <Filter
          descriptionFilter='Ra??a/Cor'
          otherClassNameToMultiselectComponent='multiselect'
          actionType={actions.MUDAR_RACACOR}
          options={filtrosRacaCor}
        />
        <Filter
          descriptionFilter='Grau de Instru????o'
          otherClassNameToMultiselectComponent='multiselect'
          actionType={actions.MUDAR_GRAUINSTRUCAO}
          options={filtrosGrauInstrucao}
        />
        <Filter
          descriptionFilter='Sexo'
          otherClassNameToMultiselectComponent='multiselect'
          actionType={actions.MUDAR_SEXO}
          options={filtrosPorSexo}
          selectionLimit={1}
        />
        <Filter
          descriptionFilter='Subclasse'
          otherClassNameToMultiselectComponent='multiselect'
          actionType={actions.MUDAR_SUBCLASSE}
          options={filtrosSubclasse}
        />
      </div>
    </div>
  )
}
