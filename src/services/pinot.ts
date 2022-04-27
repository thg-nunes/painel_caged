import axios from 'axios'

const url_api = 'http://localhost:3334'
// const url_api = 'http://dados.jucema.ma.gov.br/'

export const getDadosGraficos = async (classificacao, filtros) => {
  return await axios({
    method: 'POST', 
    url: `${url_api}/dadosGraficos`, 
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

export const getDadosFiltrosUF = async (context) => {

  return await axios({
    method: 'POST',
    data: {
      state: context.state
    },
    url: `${url_api}/filtrosUF`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

type FiltroUF = {
  value: string
  label:string
}

export const getDadosFiltrosMunicipio = async (uf: FiltroUF[]) => {

  let estado = ''
  uf.length === 1 ? estado = uf[0].label : estado = ''
  
  return await axios({
    method: 'POST',
    url: `${url_api}/filtrosMunicipio`,
    data: { estado }
  })
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosPorte = async (context) => {

  return await axios({
    method: 'POST',
    data: {
      state: context.state
    },
    url: `${url_api}/porte`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosOcupacao = async (context) => {

  return await axios({
    method: 'POST',
    data: {
      state: context.state
    },
    url: `${url_api}/ocupacao`
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosSetor = async (context) => {

  return await axios({
    method: 'POST',
    data: {
      state: context.state
    },
    url: `${url_api}/setor`
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosRacaCor = async (context) => {

  return await axios({
    method: 'POST',
    data: {
      state: context.state
    },
    url: `${url_api}/racaCor`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosGaudeInstrucao = async (context) => {

  return await axios({
    method: 'POST',
    data: {
      state: context.state
    },
    url: `${url_api}/grauInstrucao`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosSexo = async (context) => {

  return await axios({
    method: 'POST',
    data: {
      state: context.state
    },
    url: `${url_api}/filtrosSexo`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosSubclasse = async (context) => {

  return await axios({
    method: 'POST',
    data: {
      state: context.state
    },
    url: `${url_api}/subclasse`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}
