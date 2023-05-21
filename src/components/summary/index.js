import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import './style.css';

function Summary({price}){

  return (
    <div className='Summary'>
      Итого: <span>{`${formatPrice(price)} ₽`}</span>
    </div>
  )
}

Summary.propTypes = {
  price: PropTypes.number.isRequired
};

export default Summary;
