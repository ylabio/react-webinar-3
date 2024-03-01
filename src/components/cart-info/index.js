import React from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function CartInfo({count, totalSumm}) {
  return (
    <div className='cart-info'>
      <h1>{`В корзине: ${count} ${plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} /${totalSumm}`}  &#8381;</h1>
    </div>
  )
}

CartInfo.propTypes = {
  info: PropTypes.node,
};

export default React.memo(CartInfo);