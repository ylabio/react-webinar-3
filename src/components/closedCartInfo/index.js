import React from "react";
import PropTypes from "prop-types";
import {plural, formatPrice} from "../../utils";
import './style.css';

function ClosedCartInfo({count, totalPrice}) {
  const variants = { one: 'товар', few: 'товара', many: 'товаров' };

  return (
    <div className='info'>
      В корзине: <b>{count > 0 ? `${count} ${plural(count, variants)} / ${formatPrice(totalPrice)}  ₽` : 'пусто'}</b>
    </div>
  )
}

ClosedCartInfo.propTypes = {
	count: PropTypes.node,
	totalPrice: PropTypes.node,
};

export default React.memo(ClosedCartInfo);