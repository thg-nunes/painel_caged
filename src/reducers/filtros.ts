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
      if(typeof action.payload === 'number') {
        return{...state, ano: action.payload}
      }

      if(action.payload.length == 0){
        return{...state, ano: ano}
      }

      return {...state, ano: action.payload[0].label}
    case actions.MUDAR_ESTADO:
      if(action.payload.length == 0){
        return{...state, uf: ''}
      } else {
        return {...state, uf: action.payload}
      }

    case actions.MUDAR_MUNICIPIO:
      if(action.payload.length == 0){
        return{...state, municipio: ''}
      } else {
        return {...state, municipio: action.payload}
      }

    case actions.MUDAR_MES:
      if(action.payload.length == 0){
        return{...state, data: []}
      } else {
        const months_selecteds = action.payload.map(month => {
          return month.value
        })
        return {...state, data: [...months_selecteds] }
      }

    case actions.MUDAR_PORTE:
      if(action.payload.length == 0){
        return{...state, porte: ''}
      } else {
        return {...state, porte: action.payload}
      }

    case actions.cbo2002ocupacao:
      if(action.payload.length == 0){
        return{...state, cbo2002ocupacao: ''}
      } else {
        return {...state, cbo2002ocupacao: action.payload}
      }

    case actions.MUDAR_SETOR:
      if(action.payload.length == 0){
        return{...state, setor: ''}
      } else {
        return {...state, setor: action.payload}
      }

    case actions.MUDAR_RACACOR:
      if(action.payload.length == 0){
        return{...state, racacor: ''}
      } else {
        return {...state, racacor: action.payload}
      }


    case actions.MUDAR_GRAUINSTRUCAO:
      if(action.payload.length == 0){
        return{...state, graudeinstrucao: ''}
      } else {
        return {...state, graudeinstrucao: action.payload}
      }

    case actions.MUDAR_SEXO:
      if(action.payload.length == 0){
        return{...state, sexo: ''}
      } else {
        return {...state, sexo: action.payload}
      }

      case actions.MUDAR_SUBCLASSE:
      if(action.payload.length == 0){
          return{...state, subclasse: ''}
        } else {
          return {...state, subclasse: action.payload}
        }

    default:
      return {...state}
  }
}
