import React from 'react';
import { Overlay } from '../overlay';
import { CartHead } from './cart-head';
import { CartItem } from './cart-item';
import { CartTotalPrice } from './cart-total-price';
import './style.css';

export const Cart = (props) => {

  return(
    <div>
      <div className='Cart'>
        <CartHead 
          title='Корзина'
          setIsCartShow={props.setIsCartShow}
        />
        <ul className='Cart-list'>
          {props.cart.map(item => 
            <CartItem 
              key={item.code} 
              item={item} 
              onDeleteItem={props.onDeleteItem}
            />
          )}
        </ul>
        <CartTotalPrice cartItemsPrice={props.cartItemsPrice}/>
      </div>
      <Overlay/>
    </div>
  )
}