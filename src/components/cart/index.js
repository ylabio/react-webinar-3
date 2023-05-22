import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import List from "../list";
import { thousSeparator } from "../../utils";
import CartLayout from "../cart-layout";
import CartItem from "../cart-item";

function Cart({cartContent, cartSummary, showModal, closeCart, cartItemDelete}) {

  const itemCount = cartSummary.cartCount;
  const total = cartSummary.cartSum;

  return (
    <CartLayout showModal={showModal}>
      <Head title='Корзина'>
        <div className='Cart-control'>
          <button onClick={closeCart}>Закрыть</button>
        </div>
      </Head>
      <div className='Cart-spacer'>
        {!itemCount && 'В корзине пока ничего нет...'}
      </div>
      <List list={cartContent} ItemComp={CartItem} handleControl={cartItemDelete}/>
      <div className='Cart-summary'>
        Итого: 
        <span>{thousSeparator(total)}&nbsp;&#8381;</span>
        <span>{itemCount}&nbsp;шт</span>
      </div>
    </CartLayout>
  )
}

Cart.propTypes = {
  cartContent: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  cartSummary: PropTypes.shape({
    cartCount: PropTypes.number,
    cartUniqueCount: PropTypes.number,
    cartSum: PropTypes.number
  }),
  showModal: PropTypes.bool,
  closeCart: PropTypes.func,
  cartItemDelete: PropTypes.func
};

Cart.defaultProps = {
  cartSummary: {
    cartCount: 0,
    cartUniqueCount: 0,
    cartSum: 0
  },
  showModal: false,
  closeCart: () => {},
  cartItemDelete: () => {}
}

export default React.memo(Cart);
