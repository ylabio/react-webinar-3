import React from 'react';
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import './style.css';

function CartInfo({amount, cost}) {

  const forms = {
    one: 'товар',
    few: 'товара',
    many: 'товаров'
  }

  const inCart = amount > 0
  ? `${amount} ${plural(amount, forms)} / ${cost} ₽`
  : 'пусто';

  return (
    <div className='Cart-info'>
      <span>В корзине:&nbsp;&nbsp;</span>
      <b>{inCart}</b>
    </div>
  )
}

CartInfo.propTypes = {
  amount: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
};


export default React.memo(CartInfo);