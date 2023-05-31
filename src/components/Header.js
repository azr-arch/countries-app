import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  let toggleBtn, toggleCurrMode;
  const handleToggle = () => {
    toggleBtn = document.querySelector('.toggle-btn')
    toggleCurrMode = toggleBtn.getAttribute('data-mode')
    toggleCurrMode === 'light' ? toggleHelper('dark') : toggleHelper('light')
  }

  function toggleHelper(mode) {
    toggleBtn.setAttribute('data-mode', mode)
    document.querySelector('html').setAttribute('data-theme', mode)
    localStorage.setItem('mode', JSON.stringify(mode))
  }
  
  return (
    <header>
        <h1 className="header--logo">
            Where in the world ?
            <FontAwesomeIcon icon={faGlobe} style={{marginLeft:'20px'}} spin/>
        </h1>

        <div className="header--theme-switch">
          <div className="toggle-btn" onClick={(e) => handleToggle() } data-mode='light'>
            <div className="circle" id='circle'></div>
          </div>
        </div>
    </header>
  )
}

export default Header