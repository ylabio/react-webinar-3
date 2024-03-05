import React from "react";
import PropTypes from 'prop-types';
import Head from '../head';
import List from '../list';
import CartItem from '../cart-item';
import CartTotal from '../cart-total';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Cart({list, totalSum, onCloseModal, onDeleteItemFromCart}) {

  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <Head title='Корзина' inCart={true} onCloseModal={onCloseModal} />
      {list.length ? 
      <>
        <List 
          list={list} 
          renderItem={(item) => (
            <CartItem item={item} onDeleteItemFromCart={onDeleteItemFromCart} />
          )}
        />
        <CartTotal totalSum={totalSum} />
      </>
      :
      <h2>Корзина пустая</h2>}
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  })).isRequired,
  totalSum: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDeleteItemFromCart: PropTypes.func.isRequired
};

Cart.defaultProps = {
  onCloseModal: () => {},
  onDeleteItemFromCart: () => {}
}

export default React.memo(Cart);
