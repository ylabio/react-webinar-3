import React from 'react';
import { useCart } from '../../cart-context';
import { IconCart } from '../icon';
import { plural, calculateCartTotal, formatPrice } from '../../utils';
import { STRINGS } from '../../const';
import './style.css';

function Cart() {
  const { cart, toggleCartModal } = useCart();

  const title = React.useMemo(() => getCartTitle(cart), [cart]);

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

  if (count === 0) return STRINGS.EMPTY;

  return `${count} ${plural(count, STRINGS.PRODUCT_COUNT_FORMS)} / ${formatPrice(calculateCartTotal(cart))}`;
}

export default React.memo(Cart);
