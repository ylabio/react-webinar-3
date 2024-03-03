import React from 'react';
import './style.css'
import Head from "../head";
import List from "../list";
import ShopSum from "../shop-sum";
import PropTypes from "prop-types";

const Cart = ({ list, showModal, removeFromCart }) => {
  return (
    <div className='Cart'>
      <Head title='Корзина' inCart showModal={showModal} />
      <div className='Cart-body'>
        {list.length
          ? <List list={list} inCart removeFromCart={removeFromCart} />
          : <div className='Cart-warning'>Здесь ничего нет!</div>
        }
      </div>
      <div className='Cart-summary'>
        <span style={{width: '12%'}}>Итого</span>
        <span style={{width: '15%'}}>
          <ShopSum list={list} />
        </span>
      </div>
    </div>
  );
};

Cart.propTypes = {
  list: PropTypes.array,
  showModal: PropTypes.func,
  removeFromCart: PropTypes.func
}

Cart.defaultProps = {
  showModal: () => {},
  removeFromCart: () => {}
}

export default React.memo(Cart);
