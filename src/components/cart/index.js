import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import CartItem from '../cart-item';
import List from '../list';

function Cart({ cartList, deleteItemCart, total }) {
  return (
    <>
      <div className="Cart-header">
        <span>Корзина</span>
      </div>
      {cartList.length > 0 ? (
        <div className="Cart-items-list">
          <List list={cartList} ItemComponent={CartItem} action={deleteItemCart} />
          <div className="Cart-footer">
            <div className="Cart-footer-total">
              Итого: <span>{total.toLocaleString()} ₽</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="Cart-empty">Корзина пуста</p>
      )}
    </>
  );
}

Cart.propTypes = {
  onClose: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  cartList: PropTypes.array.isRequired,
  deleteItemCart: PropTypes.func.isRequired,
};

export default React.memo(Cart);
