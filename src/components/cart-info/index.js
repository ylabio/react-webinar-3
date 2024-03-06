import React from 'react';
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import {formatNumber} from '../../utils';
import './style.css';

function CartInfo({total, cost}) {

  const forms = {
    one: 'товар',
    few: 'товара',
    many: 'товаров'
  }

  const inCart = total > 0
  ? `${total} ${plural(total, forms)} / ${formatNumber(cost)} ₽`
  : 'пусто';

  return (
    <div className='Cart-info'>
      <span>В корзине:&nbsp;&nbsp;</span>
      <b>{inCart}</b>
    </div>
  )
}

CartInfo.propTypes = {
  total: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
};


export default React.memo(CartInfo);