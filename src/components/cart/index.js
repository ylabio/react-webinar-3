import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartContent from '../cart-content';
import Modal from '../modal';
import { numberFormat } from '../../utils';
import List from "../list";
import CartItem from "../cart-item";

function Cart({ onDelete = code => {}, cartList, totalCost, uniqueItems }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const callbacks = {
    onOpenModal: useCallback(() => {
      setIsOpenModal(true);
    }, [isOpenModal]),

    onCloseModal: useCallback(() => {
      setIsOpenModal(false);
    }, [isOpenModal]),
  };

  const renderCartItem = cartItem => <CartItem cartItem={cartItem} onDeleteItem = {onDelete} />

  return (
    <div className="Cart">
      <CartContent
        uniqueItems={uniqueItems}
        totalCost={totalCost}
        onOpenModal={callbacks.onOpenModal}
      />
      <Modal isOpen={isOpenModal} onClose={callbacks.onCloseModal}>
        <>
          <List list={cartList} renderItem={renderCartItem}/>
          <div className="Cart-totalCost">
            <h4>Итого:</h4>
            <h4> {numberFormat(totalCost)} ₽</h4>
          </div>
        </>
      </Modal>
    </div>
  );
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    }),
  ),
  onDelete: PropTypes.func,
  totalCost: PropTypes.number,
  uniqueItems: PropTypes.number,
};

export default React.memo(Cart);
