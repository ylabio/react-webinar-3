import React from 'react';
import { useCart } from '../../cart-context';
import { IconCart } from '../icon';
import { plural, calculateCartTotal, formatPrice } from '../../utils';
import './style.css';

function Cart() {
  const { cart, toggleCartModal } = useCart();

  const title = getCartTitle(cart);

  return (
    <div className="Cart">
      <div className="Cart-container" onClick={toggleCartModal}>
        <IconCart />
        <div className="Cart-title">{title}</div>
      </div>
    </div>
  );
}

function getCartTitle(cart) {
  const count = cart.length;

  if (count === 0) return "Пусто";

  return `${count} ${plural(count, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  })} / ${formatPrice(calculateCartTotal(cart))}`;
}

export default React.memo(Cart);
