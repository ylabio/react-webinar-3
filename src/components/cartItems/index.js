import React from 'react';
import CartItem from '../cartItem';

function CartItems({store}) {
  const { cart, items } = store.getState();
  return Object.keys(cart).map(code => (
    <CartItem
      key={+code}
      item={items.find((x) => x.code === +code)}
      cnt={cart[code]}
      onDelete={store.removeFromCart}
    />
  ));
}

export default CartItems;
