import React from "react";
import PropTypes from 'prop-types';
import List from '../list'
import './style.css';

function Cart({
  cart,
  sumInCart,
  itemButtonText,
  onButtonClick,
}) {
  return (
    <div className="cart">
      <List
        list={cart}
        itemButtonText={itemButtonText}
        onButtonClick={onButtonClick}
      />
      <div className="cart__info-block">
        <span className="cart__info-block-text">Итого</span>
        <span className="cart__info-block-sum">{sumInCart}</span>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.array,
  sumInCart: PropTypes.string,
  itemButtonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

Cart.defaultProps = {
  cart: [],
  sumInCart: '',
  itemButtonText: '',
  onButtonClick: () => { },
}

export default React.memo(Cart);