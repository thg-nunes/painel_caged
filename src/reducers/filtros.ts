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
      console.log(action.payload)
      if(action.payload.length == 0){
        return{...state, uf: ''}
      } else {
        return {...state, uf: action.payload}
      }

    case actions.MUDAR_MUNICIPIO:
      console.log(action.payload)
      if(action.payload.length == 0){
        return{...state, municipio: ''}
      } else {
        return {...state, municipio: action.payload}
      }

    case actions.MUDAR_MES:
      let meses: Meses[] = []
      for (let i = 0; i < action.payload.length; i++) {
        switch (action.payload[i].label) {
          case 'Janeiro':
            meses.push({value: 'data', data_inicio:`-01-01`, data_fim: `-01-31`, mes: action.payload[i].label })
            break
          case 'Fevereiro':
            meses.push({value: 'data', data_inicio: `-02-01`, data_fim: `-02-31`, mes: action.payload[i].label })
            break
          case 'Março':
            meses.push({value: 'data', data_inicio: `-03-01`, data_fim: `-03-31`, mes: action.payload[i].label })
            break
          case 'Abril':
            meses.push({value: 'data', data_inicio: `-04-01`, data_fim: `-04-31`, mes: action.payload[i].label })
            break
          case 'Maio':
            meses.push({value: 'data', data_inicio: `-05-01`, data_fim: `-05-31`, mes: action.payload[i].label })
            break
          case 'Junho':
            meses.push({value: 'data', data_inicio: `-06-01`, data_fim: `-06-31`, mes: action.payload[i].label })
            break
          case 'Julho':
            meses.push({value: 'data', data_inicio: `-07-01`, data_fim: `-07-31`, mes: action.payload[i].label })
            break
          case 'Agosto':
            meses.push({value: 'data', data_inicio: `-08-01`, data_fim: `-08-31`, mes: action.payload[i].label })
            break
          case 'Setembro':
            meses.push({value: 'data', data_inicio: `-09-01`, data_fim: `-09-31`, mes: action.payload[i].label })
            break
          case 'Outubro':
            meses.push({value: 'data', data_inicio: `-10-01`, data_fim: `-10-31`, mes: action.payload[i].label })
            break
          case 'Novembro':
            meses.push({value: 'data', data_inicio: `-11-01`, data_fim: `-11-31`, mes: action.payload[i].label })
            break
          case 'Dezembro':
            meses.push({value: 'data', data_inicio: `-12-01`, data_fim: `-12-31`, mes: action.payload[i].label })
            break
        }
      }
      if(action.payload.length == 0){
        return{...state, data: ''}
      } else {
        return {...state, data: meses}
      }

    case actions.MUDAR_PORTE:
      console.log(action.payload)
      if(action.payload.length == 0){
        return{...state, porte: ''}
      } else {
        return {...state, porte: action.payload}
      }

    case actions.cbo2002ocupacao:
      console.log(action.payload)
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
      console.log(action.payload)
      if(action.payload.length == 0){
        return{...state, racacor: ''}
      } else {
        return {...state, racacor: action.payload}
      }


    case actions.MUDAR_GRAUINSTRUCAO:
      console.log(action.payload)
      if(action.payload.length == 0){
        return{...state, graudeinstrucao: ''}
      } else {
        return {...state, graudeinstrucao: action.payload}
      }

    case actions.MUDAR_SEXO:
      console.log(action.payload)
      if(action.payload.length == 0){
        return{...state, sexo: ''}
      } else {
        return {...state, sexo: action.payload}
      }

      case actions.MUDAR_SUBCLASSE:
      console.log(action.payload)
      if(action.payload.length == 0){
          return{...state, subclasse: ''}
        } else {
          return {...state, subclasse: action.payload}
        }

    default:
      return {...state}
  }
}