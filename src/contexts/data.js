const initial_date = new Date()

export const estadoGlobal = {
  data: '',
  uf: '',
  municipio: '',
  porte: '',
  cbo2002ocupacao: '',
  setor: '',
  racacor: '',
  graudeinstrucao: '',
  sexo: '',
  subclasse: '',
  saldo_geral: '',
  saldo_mpe: '',
  ano:
    initial_date.getMonth() >= 2 && initial_date.getDate() >= 10
      ? initial_date.getFullYear()
      : initial_date.getFullYear() - 1,
}
