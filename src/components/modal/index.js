import React from 'react';
import './style.css';
import List from '../list';

function Modal({
  cart = [],
  price = 0,
  showModal = false,
  onShowModal = () => {},
  onDeleteItem = () => {},
}) {
  const callbacks = {
    onClick: () => {
      onShowModal();
    },
  };

  return (
    <div className="Modal" style={{ display: showModal ? 'flex' : 'none' }}>
      <div className="Modal__content">
        <div>
          <span className="Modal__close" onClick={callbacks.onClick}>
            &#215;
          </span>
          <h3 className='Modal__title'>Корзина</h3>
        </div>
        <List list={cart} isCart={true} onDelete={onDeleteItem}></List>
        <div className="Modal__price">
          <b>Итого:</b>
          <b>{price} ₽</b>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Modal);
