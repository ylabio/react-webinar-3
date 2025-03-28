import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';
import CartIcon from '../cart-icon';

function CartButton({ cartTotal, cartSum, onClick }) {
  const cartText = cartTotal > 0 
    ? `${cartTotal} ${plural(cartTotal, {one: 'товар', few: 'товара', many: 'товаров'})} / ${cartSum} Руб`
    : 'Пусто';

  return (
    <div className="CartButton-container">
      <button className="CartButton" onClick={onClick}>
        <img CartIcon alt="Корзина" className="CartButton-icon" />
        {cartText}
      </button>
    </div>
  );
}

CartButton.propTypes = {
  cartTotal: PropTypes.number,
  cartSum: PropTypes.number,
  onClick: PropTypes.func
};

CartButton.defaultProps = {
  cartTotal: 0,
  cartSum: 0,
  onClick: () => {}
};

export default React.memo(CartButton);