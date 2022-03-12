import * as Styled from './styled'

export const DataHeader = () => {
  return (
    <Styled.Data>
      <p className="texto-header">Painel de Empregos Formais - JUCEMA</p>
      <img className="logo" src="" alt="logo" />
      <svg className='menu-mobile' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"
        onClick={() => {
          document.getElementById('all_filters').style.display = 'block'
        }}
      ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
    </Styled.Data>
  )
}
