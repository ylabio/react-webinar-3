import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import List from '../list';
import ListItem from '../list-item';
import CartProduct from '../cart-product';
import {formatPrice} from "../../utils";

function Cart({ totalCartPrice, cart, onDeleteProductFromCart = _ => {} }) {
  return (
    <div className="Cart">
      {cart?.length ? (
        <>
          <List>
            {cart.map(cartProduct => (
              <ListItem key={cartProduct.code}>
                <CartProduct cartProduct={cartProduct} onDeleteFromCart={onDeleteProductFromCart} />
              </ListItem>
            ))}
          </List>
          <div className="Cart-footer">
            <div className="Cart-footer-label">Итого:</div>
            <div className="Cart-footer-price">
              {formatPrice(totalCartPrice)}
            </div>
          </div>
        </>
      ) : (
        <div className="Cart-empty">Пусто</div>
      )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onDeleteProductFromCart: PropTypes.func,
};

export default React.memo(Cart);
