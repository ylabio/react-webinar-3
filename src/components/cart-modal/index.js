import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../cart-item';
import Modal from '../modal';
import './style.css';

function CartModal({ cart = [], total = 0, onClose = () => {}, onRemoveItem = () => {} }) {
  return (
    <Modal onClose={onClose}>
      <div className="CartModal-header">
        <h2>Корзина</h2>
        <button className="CartModal-close" onClick={onClose}>
          ✕
        </button>
      </div>
      {cart.length > 0 ? (
        <>
          <div className="CartModal-list">
            {cart.map((item, index) => (
              <div
                key={item.code}
                className={`CartModal-item${index % 2 ? '' : ' CartModal-item_odd'}`}
              >
                <CartItem item={item} onRemove={onRemoveItem} />
              </div>
            ))}
            <div className="CartModal-footer">
              <div className="CartModal-total">
                <span className="CartModal-total-label">
                  <b>Итого:</b>
                </span>
                <span className="CartModal-total-amount">
                  <b>{total?.toLocaleString()} ₽</b>
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="CartModal-empty">Ваша корзина пуста</div>
      )}
    </Modal>
  );
}

CartModal.propTypes = {
  cart: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  onRemoveItem: PropTypes.func,
};

export default React.memo(CartModal);
