import axios from 'axios'

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


export const getDadosFiltros = async (classificacao, filtros) => {
  if(filtros == undefined || filtros == null || filtros.state == undefined || filtros.state == null)
  return []

  const apelido_coluna_1 = 'natureza_empresa'
  const apelido_coluna_2 = 'municipio'
  let apelido_tabela = ''

  let query = `select ${classificacao}, sum(saldomovimentacao) as saldo from caged `
  let otherFilters = ''
  let filters = ' where '
  
  let groupBy = ''
  let desc = ''

  switch (classificacao) {
    case 'data':
      groupBy = 'data'
      break
  }

  for (const key in filtros.state) {
    if(filtros.state[key] == 'Selecionar') filtros.state[key] = ''
    
    console.log(filtros.state[key])

    if(filtros.state[key] !== ''){
      switch (key) {
        case 'ano':
          filters += `data between '${filtros.state.ano}-01-01' and '${filtros.state.ano}-12-31' group by ${classificacao} order by ${classificacao == 'data' ? 'data' : 'saldo'} ${classificacao == 'data' ? '' : 'desc'} limit 800000`
          break
        default:
          if(typeof filtros.state[key] == 'object' &&  filtros.state[key].length >= 1){

            filtros.state[key].map((element, index) => {
              index !== 0 ? otherFilters += `or ${key} = '${element.label}' ${index == filtros.state[key].length - 1 ? ') and ' : ''}` : otherFilters += `(${key} = '${element.label}' ${filtros.state[key].length == 1 ? ') and' : ''} `
            })
            filters = 'where ' + otherFilters
            break
          } else {
            filters += `${key} = '${filtros.state[key]}' and `
            break
          }
      }
    }
  }
  
  console.log(query + filters)

  return await axios({
    method: 'POST', 
    url: 'http://179.127.13.245:3000/query/sql', 
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      "sql": query + filters
    }
  })
  .then(res => {
    return res.data.resultTable.rows
  })
  .catch(err => err)
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
export const getDadosFiltrosUF = async () => {

  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select distinct uf from caged order by uf limit 800000`
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosMunicipio = async (uf:string) => {

  uf == '' ? uf = 'Maranhão' : uf = uf
  
  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select distinct municipio from caged where uf = '${uf}' order by municipio limit 800000`
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosPorte = async () => {

  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select distinct porte from caged order by porte limit 800000`
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosOcupacao = async () => {

  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select distinct cbo2002ocupacao from caged order by cbo2002ocupacao limit 800000`
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosSetor = async () => {

  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select distinct setor from caged order by setor limit 800000`
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosRacaCor = async () => {

  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select distinct racacor from caged order by racacor limit 800000`
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosGaudeInstrucao = async () => {

  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select distinct graudeinstrucao from caged order by graudeinstrucao limit 800000`
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosSexo = async () => {

  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select distinct sexo from caged order by sexo limit 800000`
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosSubclasse = async () => {

  return await axios({
    method: 'POST',
    url: 'http://179.127.13.245:3000/query/sql',
    headers: {
      'Target-URL': 'http://pinot-broker:8099',
    },
    data: {
      sql: `select distinct subclasse from caged order by subclasse limit 800000`
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}
