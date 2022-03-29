import axios from 'axios'

const url_api = 'http://localhost:3001'

export const get_dados_grafico_mensal = async (context) => {
  return await axios({
    method: 'POST',
    url: `${url_api}/getDadosMensais`,
    data: {
      context
    },
  })
  .then((res) => {
    return res.data
  })
    .catch((err) => err)
}

export const getDadosGraficos = async (classificacao, filtros) => {
  return await axios({
    method: 'POST', 
    url: `${url_api}/getDadosGraficos`, 
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

export const getDadosFiltrosUF = async () => {

  return await axios({
    method: 'GET',
    url: `${url_api}/getFiltrosUF`,
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
    url: `${url_api}/getFiltrosMunicipio`,
    data: { estado }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosPorte = async () => {

  return await axios({
    method: 'GET',
    url: `${url_api}/getPorte`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosOcupacao = async () => {

  return await axios({
    method: 'GET',
    url: `${url_api}/getPorte`
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosSetor = async () => {

  return await axios({
    method: 'GET',
    url: `${url_api}/getSetor`
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosRacaCor = async () => {

  return await axios({
    method: 'GET',
    url: `${url_api}/getRacaCor`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosGaudeInstrucao = async () => {

  return await axios({
    method: 'GET',
    url: `${url_api}/getRacaCor`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosSexo = async () => {

  return await axios({
    method: 'GET',
    url: `${url_api}/get_filtrosSexo`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}

export const getDadosFiltrosSubclasse = async () => {

  return await axios({
    method: 'GET',
    url: `${url_api}/get_subclasse`,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => err)
}
