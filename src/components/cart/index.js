import React from "react";
import PropTypes from "prop-types";
import './style.css';
import List from "../list";
import Head from "../head";
import ItemInCart from "../item-in-cart"

function Cart({cart, onDeleteItemFromCart, handleCartModalClose}) {
  return (
    <div className="Cart">
      <Head title='Корзина' onClose={handleCartModalClose}/>
      {cart.cartList.length 
        ? <div className="Cart-content">
          <List
            list={cart.cartList}
            renderItem={ItemInCart}
            itemProps={{
              onDeleteFromCart: onDeleteItemFromCart
            }}
          />
          <div className="Cart-total">
            <div>
              Итого
            </div>
            <div>
              {`${cart.cartTotalPrice} ₽`}
            </div>
          </div>
        </div>
        : <div className="Cart-empty">Пусто</div>
      }
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.shape({
    cartList: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number,
    })),
    cartTotalPrice: PropTypes.number,
  }),
  onDeleteItemFromCart: PropTypes.func,
  handleCartModalClose: PropTypes.func,
};

Cart.defaultProps = {
  cart: {
    cartList: [],
    cartItemsCount: 0,
    cartTotalPrice: 0
  },
  onDeleteItemFromCart: () => {},
  handleCartModalClose: () => {},
};

export default React.memo(Cart);
