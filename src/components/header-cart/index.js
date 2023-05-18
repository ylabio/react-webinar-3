import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice, plural } from "../../utils";
import './style.css';

function HeaderCart({cart, onToggleCart}) {
  const totalView = cart.cartQuantity ? `${cart.cartQuantity} ${plural(cart.cartQuantity, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatPrice(cart.cartSum)}` : 'пусто';

  return (
    <div className='HeaderCart'>
      <span>В корзине: <span className="HeaderCart-total">{totalView}</span></span>
      <button className="HeaderCart-button" onClick={() => onToggleCart()}>Перейти</button>
    </div>
  )
}

HeaderCart.propTypes = {
  cart: PropTypes.shape({
    cartList: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number
    })),
    cartSum: PropTypes.number,
    cartQuantity: PropTypes.number
  }).isRequired,
  onToggleCart: PropTypes.func
};

HeaderCart.defaultProps = {
  onToggleCart: () => {}
}

export default React.memo(HeaderCart);
