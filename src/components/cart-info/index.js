import React from "react";
import PropTypes from "prop-types";
import {plural, formatNum} from "../../utils";
import './style.css';

function CartInfo({count, totalSumm}) {
  return (
    <div className='cart-info'>
      <p>В корзине: <b>{count ? `${count} ${plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${formatNum(totalSumm)} ₽` : 'пусто'}</b></p>
    </div>
  )
}

CartInfo.propTypes = {
  count: PropTypes.number,
  totalSumm: PropTypes.number,
};

export default React.memo(CartInfo);