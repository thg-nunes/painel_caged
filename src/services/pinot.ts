import axios from 'axios'

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

export const getDadosGraficos = async (classificacao, filtros) => {
  if(filtros == undefined || filtros == null || filtros.state == undefined || filtros.state == null)
  return []

  let query = `select ${classificacao == 'saldo_geral' || classificacao == 'saldo_mpe' ? '' : classificacao + ','} sum(saldomovimentacao) as saldo from caged `
  let otherFilters = ''
  let filters = ` where ${classificacao == 'saldo_mpe' ? `(porte = 'Microempresa' or porte = 'Pequeno Porte') and ` : ''}`
  
  for (const key in filtros.state) {

    if(filtros.state[key] == 'Selecionar') filtros.state[key] = ''
    
    if(filtros.state[key] !== ''){  
      switch (key) {
        case 'ano':
          filters += `data between '${filtros.state.ano}-01-01' and '${filtros.state.ano}-12-31' ${classificacao == 'saldo_geral' || classificacao == 'saldo_mpe' ? '' : `group by ${classificacao} `} ${classificacao == 'saldo_geral' || classificacao == 'saldo_mpe' ? 'limit 800000' : `order by ${classificacao == 'data' ? 'data' : 'saldo'} limit 800000`} `
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
