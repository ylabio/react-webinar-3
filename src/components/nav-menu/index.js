import React,{ memo } from 'react'
import { Link } from 'react-router-dom';
import './style.css'

function NavMenu() {
  return (
    <nav className='Nav-menu'>
      <Link to={'/'}>Главная</Link>
    </nav>
  )
}

export default memo(NavMenu);