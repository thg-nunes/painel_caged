import { useState } from 'react'
import logo from '../../assets/Governo-Maranhao-MA.png'
import './style.css'

export const DataHeader = () => {
  const [menuBlock, setMenuBlock] = useState(false)
  return (
    <section className='header-mobile'>
      <div className='data'>
        <p className="texto-header">Painel de Empregos Formais - JUCEMA</p>
        <img className="logo" src={logo} alt="logo" />
      </div>
        <svg className='menu-mobile' xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px" fill="#FFFFFF"
          onClick={() => {
            setMenuBlock(!menuBlock)
            document.getElementById('all_filters').style.display = menuBlock ? 'block' : 'none'
          }}
        ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
    </section>
  )
}
