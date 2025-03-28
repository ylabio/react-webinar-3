import React, { useState, useEffect  } from 'react';
import PropTypes from 'prop-types';
import CartItem from '../cart-item';
import './style.css';

function CartModal({ cartItems = [], totalPrice = 0, isOpen = false,  onClose = () => {}, onRemoveFromCart = () => {} }) {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen); // Используем переданное значение isOpen для инициализации

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);
  
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen); // Меняем внутреннее состояние
    onClose(); // Закрываем модалку
  };

  console.log("CartModal: isOpen=", isOpen);
  console.log("CartModal: modalIsOpen=", modalIsOpen);

  return (
    modalIsOpen && ( // Отображаем только если modalIsOpen истинно
      <div className="CartModal">
        <header className="CartModal-header">
          <h2>Корзина</h2>
          <button onClick={toggleModal} className="CartModal-close-button">✖️</button>
        </header>
        <section className="CartModal-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.code}
                item={item}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))
          ) : (
            <p>Ваша корзина пуста</p>
          )}
        </section>
        <footer className="CartModal-footer">
          Итого: {totalPrice.toFixed(2)} ₽
        </footer>
      </div>
    )
  );
}

CartModal.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
  totalPrice: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

export default React.memo(CartModal);