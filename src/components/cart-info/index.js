import React from 'react';
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import './style.css';

function CartInfo({amount, cost}) {

  const currency = '\u20BD';
  const forms = {
    one: 'товар',
    few: 'товара',
    many: 'товаров'
  }

  const inCart = ` ${amount} ${plural(amount, forms)} / ${cost} ${currency}`

  return (
    <div className='Cart-info'>
      <span>В корзине:</span>
      <b>{inCart}</b>
    </div>
  )
}

CartInfo.propTypes = {
  amount: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
};


export default React.memo(CartInfo);