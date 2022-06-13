import axios from 'axios'

const url_api = process.env.REACT_APP_BACKEND; //'http://dados.jucema.ma.gov.br/caged'

export const getDadosGraficos = async (classificacao, filtros) => {
  return await axios({
    method: 'POST', 
    url: `${url_api}/caged/dadosGraficos`, 
    data: {
      classificacao,
      filtros
    }
  })
  .then(res => {
    return res.data.resultTable.rows
  })
  .catch(err => err)
}

export const getDataFilter = async (context: any, filter: string) => {

  let estado = ''
  if (filter === 'municipio') {
    estado = context.state.uf[0].label
  }

  return await axios({
    method: 'POST',
    data: filter === 'municipio' ? { estado } : {
      state: context.state
    },
    url: `${url_api}/caged/${filter}`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}
