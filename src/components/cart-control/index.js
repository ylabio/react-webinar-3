import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Modal from '../modal';
import Cart from '../cart';
import { plural } from '../../utils';
import { CURRENCY } from '../../constants';

function CartControl({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const amount = store.getCartSize();
  const sum = store.getCartSum();

  const pluralLabel = plural(amount, { one: 'товар', few: 'товара', many: 'товаров' });

  const cartInfo = amount ? `${amount} ${pluralLabel} / ${sum} ${CURRENCY}` : 'Пусто';

  return (
    <>
      <button
        className="Btn_cart"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <CartIcon />
        {cartInfo}
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Cart store={store}></Cart>
      </Modal>
    </>
  );
}

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.75 3a.75.75 0 0 0 0 1.5h.369a.75.75 0 0 1 .72.545l2.379 8.325A2.25 2.25 0 0 0 9.381 15h6.854a2.25 2.25 0 0 0 2.089-1.415l2.211-5.529A1.5 1.5 0 0 0 19.143 6H6.672l-.391-1.368A2.25 2.25 0 0 0 4.119 3H3.75Zm6 18a2.249 2.249 0 1 0 0-4.498 2.249 2.249 0 0 0 0 4.498Zm6 0a2.249 2.249 0 1 0 0-4.498 2.249 2.249 0 0 0 0 4.498Z"
      fill="#6B4ACB"
    />
  </svg>
);

CartControl.propTypes = {
  store: PropTypes.object,
};

export default CartControl;
