import closeForButton from '../../assets/icons/close-button.svg';
import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function Modal({
  modalOpen,
  setModalOpen = () => {},
  cartItems,
  onGetCartTotal = () => {},
  onRemoveFromCart = () => {},
}) {
  return (
    modalOpen && (
      <div className="Modal-overlay">
        <div className="Modal-container">
          <div className="Modal-header">
            <h2 className="Modal-title">Корзина</h2>
            <button onClick={() => setModalOpen(false)} className="Modal-close">
              <img src={closeForButton} alt="Кнопка закрыть" />
            </button>
          </div>
          <ul className="Modal-list">
            {cartItems.map(item => (
              <li key={item.code} className="Modal-listItem">
                <div className="Modal-item">
                  <div className="Modal-itemTitle">
                    <b>{item.title}</b>
                  </div>
                  <div className="Modal-actions">
                    <div>
                      <span>{item.quantity} шт</span>
                      <div>
                        <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                        <button onClick={() => onRemoveFromCart(item.code)}>Удалить</button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="Modal-footer">
            <div>
              <span>Итого:</span>
              <span>{onGetCartTotal()} ₽</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

Modal.propTypes = {
  modalOpen: PropTypes.bool,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  setModalOpen: PropTypes.func,
  onGetCartTotal: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

export default React.memo(Modal);
