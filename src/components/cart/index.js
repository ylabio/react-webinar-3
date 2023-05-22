import React from 'react';
import PopUp from "../pop-up";
import Head from "../head";
import PageLayout from "../page-layout";
import List from "../list";
import Controls from "../controls";
import PropTypes from "prop-types";
import CartItem from "../cart-item.js";
import {convertPrice} from "../../utils";
import './style.css'

const Cart = ({cart, isShown, togglePopUp, onRemoveFromCart}) => {
  return (
    <PopUp isShown={isShown} onClick={togglePopUp}>
      <div className={'Cart'}>
        <PageLayout>
          <Head title={'Корзина'} withButton onClick={togglePopUp}/>
          <Controls totalPrice={cart.totalPrice} productsCount={cart.productsCount}/>
          <List list={cart.products} elem={<CartItem/>} onClick={onRemoveFromCart}/>
          <span className={'Cart-total-price'} style={{
            justifyContent: !cart.productsCount ? 'center' : 'flex-end'
          }}>
            {cart.productsCount
              ?
              <>
                <b>Итого</b>
                <b>{convertPrice(cart.totalPrice)}</b>
              </>
              :
              <b>Корзина пуста</b>
            }
          </span>
        </PageLayout>
      </div>
    </PopUp>
  );
};

Cart.propTypes = {
  cart: PropTypes.object,
  isShown: PropTypes.bool,
  togglePopUp: PropTypes.func,
  onRemoveFromCart: PropTypes.func
};

export default Cart;