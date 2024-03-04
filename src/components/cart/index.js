import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatSum } from "../../utils";
import List from "../list/index";
import './style.css';

function Cart({ cartItems, totalPrice, renderCartList }) {

  const cn = bem('Cart');

  return (
    <div>
      <List list={cartItems}
        renderItem={(item) => renderCartList(item)} />
      <div className={cn('total')}>
        <div className={cn('total-title')}>Итого</div>
        <div className={cn('total-price')}>{formatSum(totalPrice, { style: 'currency', currency: 'RUB' })}</div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(Object),
  totalPrice: PropTypes.number,
  renderCartList: PropTypes.func
};

Cart.defaultProps = {
  cartItems: [],
  totalPrice: 0,
  renderCartList: (item) => {
  }
}

export default React.memo(Cart);
