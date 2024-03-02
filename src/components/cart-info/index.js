import React from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function CartInfo({count, totalSumm}) {
  return (
    <div className='cart-info'>
      <p>{count > 0 && `В корзине: `}<b>{count ? `${count} ${plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${totalSumm} ₽` : 'Пусто'}</b></p>
    </div>
  )
}

CartInfo.propTypes = {
  count: PropTypes.number,
  totalSumm: PropTypes.number,
};

export default React.memo(CartInfo);