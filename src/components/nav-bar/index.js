import React from 'react';
import { Link } from 'react-router-dom';
import BasketTool from '../basket-tool';
import './style.css'

function NavBar(props) {
  return (
    <div className='navigation'>
      <Link to={'/'} className="link">
        <div className='navigation-link'>
          Главная
        </div>
      </Link>
      <div className='navigation-tool'>
        <BasketTool onOpen={props.onOpen} amount={props.amount} sum={props.sum} />
      </div>
    </div>
  )
}

export default NavBar;