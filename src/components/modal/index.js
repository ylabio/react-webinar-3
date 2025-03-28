import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CloseIcon from './close.svg';
import List from '../list';

function Modal({ cart = [], price = 0, showModal = false, onShowModal = () => {}, onDeleteItem = () => {}}) {

  const callbacks = {
    onClick: () => {
      onShowModal();
    },
  };
  
  return (
    <div className="Modal" style={{display: showModal?"block":"none"}}>
      <span className="Close" onClick={callbacks.onClick}><img src={CloseIcon}></img></span>
      <h1>Корзина</h1>
      <List list={cart} isCart={true} onDelete={onDeleteItem}></List>
      <div className="Modal-bottom">
        <div></div>
        <div className="Modal-total">
          <b>Итого:</b>
          <b>{price} ₽</b>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  price: PropTypes.number,
  showModal: PropTypes.bool.isRequired,
  onShowModal: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default React.memo(Modal);
