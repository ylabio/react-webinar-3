import React from 'react'
import PropTypes from 'prop-types';
import './style.css';
import { pluralCurrencies } from '../../utils'

function Footer({total}) {
  return (
    <div className='Footer'>
      <p className='Footer__text'><b>Итого</b></p>
      <p className='Footer__price'><b>{pluralCurrencies(total)}</b></p>
    </div>
  )
}

export default React.memo(Footer);


Footer.propTypes = {
  total: PropTypes.number
};