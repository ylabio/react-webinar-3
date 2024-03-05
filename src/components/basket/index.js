import React, { useCallback } from "react";
import Cart from "../cart";
import Head from "../head";
import Modal from "../modal";
import PropTypes from "prop-types";

function Basket({ cart, isShown, onClose, onDeleteItem }) {
  //   const cart = store.getState().cart;
  const totalSum = cart.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );

  //   const callbacks = {
  //     onDeleteItem: useCallback(
  //       (item) => {
  //         store.deleteItem(item);
  //         console.log("item deleted");
  //       },
  //       [store]
  //     ),
  //   };

  return (
    <Modal onClose={onClose} isShown={isShown}>
      <Head title="Корзина">
        <button onClick={onClose}>Закрыть</button>
      </Head>
      <Cart cartItems={cart} cartSum={totalSum} onDelete={onDeleteItem} />
    </Modal>
  );
}

Basket.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  isShown: PropTypes.bool,
  onClose: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

Basket.defaultProps = {
  onClose: () => {},
  onDeleteItem: () => {},
};

export default React.memo(Basket);
