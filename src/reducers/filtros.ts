import * as actions from '../contexts/actions'

const initial_date = new Date()
const ano = (initial_date.getMonth() >= 1 && initial_date.getDate() >= 15) ? initial_date.getFullYear() : initial_date.getFullYear()-1

type Meses = {
  value: string
  data_inicio: string
  data_fim: string
  mes?: string
}

export const reducerFilter = (state, action) => {
  switch (action.type) {
    case actions.MUDAR_ANO:
      if(typeof action.payload.filtros_selecionados === 'number') {
        return{...state, ano: action.payload.filtros_selecionados}
      }

      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, ano: ano}
      }

      return {...state, ano: action.payload.filtros_selecionados[0].label}
    case actions.MUDAR_ESTADO:
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, uf: ''}
      }
      return {...state, uf: action.payload.filtros_selecionados}

    case actions.MUDAR_MUNICIPIO:
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, municipio: ''}
      }
      return {...state, municipio: action.payload.filtros_selecionados}

    case actions.MUDAR_MES:
      let meses: Meses[] = []
      for (let i = 0; i < action.payload.filtros_selecionados.length; i++) {
        switch (action.payload.filtros_selecionados[i].label) {
          case 'Janeiro':
            meses.push({value: 'data', data_inicio:`-01-01`, data_fim: `-01-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Fevereiro':
            meses.push({value: 'data', data_inicio: `-02-01`, data_fim: `-02-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Março':
            meses.push({value: 'data', data_inicio: `-03-01`, data_fim: `-03-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Abril':
            meses.push({value: 'data', data_inicio: `-04-01`, data_fim: `-04-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Maio':
            meses.push({value: 'data', data_inicio: `-05-01`, data_fim: `-05-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Junho':
            meses.push({value: 'data', data_inicio: `-06-01`, data_fim: `-06-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Julho':
            meses.push({value: 'data', data_inicio: `-07-01`, data_fim: `-07-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Agosto':
            meses.push({value: 'data', data_inicio: `-08-01`, data_fim: `-08-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Setembro':
            meses.push({value: 'data', data_inicio: `-09-01`, data_fim: `-09-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Outubro':
            meses.push({value: 'data', data_inicio: `-10-01`, data_fim: `-10-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Novembro':
            meses.push({value: 'data', data_inicio: `-11-01`, data_fim: `-11-31`, mes: action.payload.filtros_selecionados[i].label })
            break
          case 'Dezembro':
            meses.push({value: 'data', data_inicio: `-12-01`, data_fim: `-12-31`, mes: action.payload.filtros_selecionados[i].label })
            break
        }
      }
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, data: ''}
      }
      return {...state, data: meses}

    case actions.MUDAR_PORTE:
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, porte: ''}
      }
      return {...state, porte: action.payload.filtros_selecionados}

    case actions.cbo2002ocupacao:
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, cbo2002ocupacao: ''}
      }
      return {...state, cbo2002ocupacao: action.payload.filtros_selecionados}

    case actions.MUDAR_SETOR:
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, setor: ''}
      }
      return {...state, setor: action.payload.filtros_selecionados}

    case actions.MUDAR_RACACOR:
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, racacor: ''}
      }
      return {...state, racacor: action.payload.filtros_selecionados}


    case actions.MUDAR_GRAUINSTRUCAO:
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, graudeinstrucao: ''}
      }
      return {...state, graudeinstrucao: action.payload.filtros_selecionados}

    case actions.MUDAR_SEXO:
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, sexo: ''}
      }
      return {...state, sexo: action.payload.filtros_selecionados}

      case actions.MUDAR_SUBCLASSE:
        if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
          return{...state, subclasse: ''}
        }
        return {...state, subclasse: action.payload.filtros_selecionados}


    default:
      return {...state}
  }
}