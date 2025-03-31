import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import CartItem from '../cartItem/index';
import CloseIcon from "../../assets/svg/CloseIcon";
import './style.css';

function Cart({
                items = [],
                totalQuantity = 0,
                totalAmount = 0,
                onClose = () => {},
                onRemove = () => {}
              }) {
  return (
    <div className="Cart-modal">
      <div className="Cart-content">
        <div className="Cart-header">
          <h2>Корзина</h2>
          <button onClick={onClose}>
            <div className="cart-button-close">
              <CloseIcon/>
            </div>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="Cart-empty">Пусто</div>
        ) : (
          <>
            <List
              list={items}
              renderItem={(item) => <CartItem item={item} onRemove={onRemove} />}
            />
          </>
        )}

        {items.length > 0 && (
          <div className="Cart-total">
            <div className="Cart-total-1">.</div>
            <div className="Cart-total-2">Итого:</div>
            <div className="Cart-total-3">{totalAmount.toLocaleString()} ₽</div>
            <div className="Cart-total-4">.</div>
          </div>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })),
  totalQuantity: PropTypes.number,
  totalAmount: PropTypes.number,
  onClose: PropTypes.func,
  onRemove: PropTypes.func
};

export default React.memo(Cart);
