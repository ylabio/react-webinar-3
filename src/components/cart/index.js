import React from 'react';
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import { store } from '../..';
import { numberFormat } from '../../utils';
import CartItem from '../cart-item';
import './style.css';

function Cart() {
  const cn = bem('Cart');
  const { totalCount, totalPrice, cart } = store.getState();

  const items = Array.from(cart.values());

  return (
    <div className='Cart'>
      {totalCount ? (
        <>
          <List list={items}>
            {(props) => <CartItem item={{ ...props }} />}
          </List>
          <div className={cn('summary')}>
            <span>Итого</span>
            <span>{numberFormat(totalPrice)} ₽</span>
          </div>
        </>
      ) : (
        <p className={cn('content')}>В корзине пусто</p>
      )}
    </div>
  );
}

export default Cart;
