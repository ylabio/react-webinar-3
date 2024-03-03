import React from "react";
import PropTypes from "prop-types";
import './style.css';
import List from "../list";
import Head from "../head";

function Cart({list, onDeleteItemFromCart, handleCartModalClose, cartInfo}) {
  return (
    <div className="Cart">
      <Head title='Корзина' onClose={handleCartModalClose}/>
      {list.length 
        ? <>
          <List
            list={list}
            onDeleteItemFromCart={onDeleteItemFromCart}
          />
          <div className="Cart-total">
            <div>
              Итого
            </div>
            <div>
              {`${cartInfo.totalPrice} ₽`}
            </div>
          </div>
        </>
        : <div className="Cart-empty">Пусто</div>
      }
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItemFromCart: PropTypes.func,
  handleCartModalClose: PropTypes.func,
  cartInfo: PropTypes.shape({
    count: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
};

export default React.memo(Cart);
