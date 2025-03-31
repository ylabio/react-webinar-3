import React from 'react';
import PropTypes from 'prop-types';
import { numberWithSpaces } from '../../utils';
import './style.css';

function Carttotal({
    totalPrice = 0,
}) {

  return (
    <div className='Cart-total'>
        <span className='Cart-total-text'>Итого:</span>
        <span className='Cart-total-total'>{numberWithSpaces(totalPrice)} ₽</span>
    </div>
  );
}

Carttotal.propTypes = {
    totalPrice: PropTypes.number,
};

export default Carttotal;
