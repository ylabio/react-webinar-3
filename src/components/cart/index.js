import React from "react";
import PropTypes from 'prop-types';
import Modal from "../modal";
import List from "../list";
import { ITEM_ACTIONS } from "../../constants/actions";
import './style.css';
import { formatPrice } from "../../utils";

function Cart({isOpen, setIsOpen, cart, list, onItemButtonClick}) {

  const itemsInCart = Object.keys(cart).map(code => {
    const item = list.find(item => item.code === Number(code));
    item.quantity = cart[code];
    return item
  })

  const totalPrice = itemsInCart.length > 0 
    && itemsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Modal title='Корзина' modalIsOpen={isOpen} setModalIsOpen={setIsOpen}>
      <List list={itemsInCart} onItemButtonClick={onItemButtonClick} action={ITEM_ACTIONS.REMOVE_FROM_CART}/>
      <p className="Cart-total">
      {totalPrice > 0 ? (
        <>
          <span className="Cart-total-label">Итого </span>
          {formatPrice(totalPrice)}
        </>
      ) : 'Корзина пуста'}
      </p>
    </Modal>
  )
}

Cart.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  cart: PropTypes.object,
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  })),
  onItemButtonClick: PropTypes.func
};

Cart.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
  onItemButtonClick: () => {}
}

export default React.memo(Cart);
