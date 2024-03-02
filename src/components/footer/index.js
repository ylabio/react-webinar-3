import React from 'react'
import PropTypes from 'prop-types';
import './style.css';

function Footer() {
  return (
    <div className='Footer'>
      <p className='Footer__text'><b>Итого</b></p>
      <p className='Footer__price'><b>223 ₽</b></p>
    </div>
  )
}

export default React.memo(Footer);
