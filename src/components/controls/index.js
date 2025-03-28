import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import cartImg from 'cart.svg';
import { plural } from '../../utils';
import CartModal from '../cart-modal';

function Controls({ cart, list, onDeleteFromCart }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Количество уникальных товаров в корзине
  const totalQuantity = Object.keys(cart).length;

  //Общая стоимость товаров в корзине
  let totalPrice = 0;
  for (let code in cart) {
    const item = list.find((val) => val.code === Number(code))
    totalPrice += cart[code] * item.price;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="Controls">
      <button className="Controls-button" onClick={openModal}>
        <img src={cartImg} alt='cart' />
        <span>
          {totalQuantity > 0
            ? `${totalQuantity} 
            ${plural(totalQuantity, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}
            / ${totalPrice} ₽`
            : 'Пусто'}
        </span>
      </button>
      {isModalOpen &&
        <CartModal
          cart={cart}
          list={list}
          onClose={closeModal}
          onDeleteFromCart={onDeleteFromCart}
          totalPrice={totalPrice}
        />}
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.objectOf(PropTypes.number),
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteFromCart: PropTypes.func,
};

Controls.defaultProps = {
  cart: {},
  onDeleteFromCart: () => { },
};

export default React.memo(Controls);
