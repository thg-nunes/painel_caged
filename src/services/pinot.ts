import axios from 'axios'


type Filtros = {
  value: string
  label: string
}

type Context = {
  dispatch: () => unknown
  state: {
    ano: number
    cbo2002ocupacao: string
    data: string
    graudeinstrucao: string
    municipio: string
    porte: string
    racacor: string
    saldo_geral: string
    saldo_mpe: string
    setor: string
    sexo: string
    subclasse: string
    uf: string
  }
}

type ResponseDadosGraficos = {
  grafico: string
  valor: any
}

export const get_dados_grafico_mensal = async (context) => {
  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select data, sum(saldomovimentacao) as saldo from caged where data between '${context.state.ano}-01-01' and '${context.state.ano}-31-12' group by data order by data limit 800000`,
    },
  })
  .then((res) => {
    return res.data
  })
    .catch((err) => err)
}

export const getDadosFiltros = async (element: string) => {

  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select distinct ${element} from caged order by ${element} limit 800000`
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getFiltros = async (filtros: string[]) => {

  let all_data: any[] = []

  for (let i = 0; i < filtros.length; i++) {
    const response = await getDadosFiltros(filtros[i])
    const { rows } = response.resultTable
    let lista_filtros: Filtros[] = []

    rows.forEach((filtro) => {
      lista_filtros.push({
        value: filtros[i],
        label: filtro[0]
      })
    })
    all_data.push(lista_filtros)
  }

  return all_data
}

const response_dadosGraficos = async (query: string) => {

  const response = await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: query,
    },
  })
    .then((res) => {
      return res.data.resultTable.rows
    })
    .catch((err) => err)

  return response
}

export const getDadosGraficos = async (column_db: string[], context: Context) => {

  let querys: any[] = []
  let querys_quantidade = ''
  
  for(let main_key in context.state) {
    let filters = ' where '
    let inicio_query_quantidade = `select sum(saldomovimentacao) as saldo from caged `
    let inicio_query = `select ${main_key}, sum(saldomovimentacao) as saldo from caged `
    const data = ` data between '${context.state.ano}-01-01' and '${context.state.ano}-12-31' group by ${main_key} order by saldo desc limit 800000`
    
    if (main_key === 'saldo_geral') {
      querys_quantidade = `${inicio_query_quantidade} ${filters} data between '${context.state.ano}-01-01' and '${context.state.ano}-12-31' limit 800000`
      querys.push(querys_quantidade)
    }else{
      if (main_key === 'saldo_mpe') {
        querys_quantidade = `${inicio_query_quantidade} ${filters} (porte = 'Microempresa' or porte = 'Pequeno Porte') and data between '${context.state.ano}-01-01' and '${context.state.ano}-12-31' limit 800000`
        querys.push(querys_quantidade)
      }else{
        for(let key in context.state) {
          switch (key) {
            case 'ano':
              inicio_query += filters + data
              break          
            case 'saldo_geral':
              break        
            case 'saldo_mpe':
              break
            default:
              if (typeof context.state[key] == 'object'){
                context.state[key].forEach((element, index) => {
                  index !== 0 ? filters += `or ${key} = '${element.label}' ${index == context.state[key].length - 1 ? ') and ' : ''}` :
                    filters += `${context.state[key].length  > 1 ? ` (${element.value} = '${element.label}' ` : ` ${element.value} = '${element.label}' and `} `
                })
                break
              }
          }
        }
        querys.push(inicio_query)
      }
    }
  }

  let all_data: ResponseDadosGraficos[] = []
  for (let i = 0; i < column_db.length; i++) {
    const response = await response_dadosGraficos(querys[i])

    all_data.push({
      grafico: column_db[i],
      valor: response
    })
  }

  return all_data
}