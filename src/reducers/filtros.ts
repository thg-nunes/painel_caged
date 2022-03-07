import * as actions from '../contexts/actions'

const initial_date = new Date()
const ano = (initial_date.getMonth() >= 1 && initial_date.getDate() >= 3) ? initial_date.getFullYear() : initial_date.getFullYear()-1

export const reducerFilter = (state, action) => {
  switch (action.type) {
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
      console.log(action, state)
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, racacor: ''}
      }
      return {...state, racacor: action.payload.filtros_selecionados}


    case actions.MUDAR_GRAUINSTRUCAO:
      console.log(action, state)
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, graudeinstrucao: ''}
      }
      return {...state, graudeinstrucao: action.payload.filtros_selecionados}

    case actions.MUDAR_SEXO:
      console.log(action, state)
      if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
        return{...state, sexo: ''}
      }
      return {...state, sexo: action.payload.filtros_selecionados}

      case actions.MUDAR_SUBCLASSE:
        console.log(action, state)
        if(action.payload.filtros_selecionados.length == 0 || action.payload.filtros_selecionados == ''){
          return{...state, subclasse: ''}
        }
        return {...state, subclasse: action.payload.filtros_selecionados}


    default:
      return {...state}
  }
}