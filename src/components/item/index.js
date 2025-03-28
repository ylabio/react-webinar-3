import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';
import Button from '../button'

function Item({item, isAccentButton = false, onAction = () => {}}) {

  const callbacks = {
    onAction: e => {
      e.stopPropagation();
      onAction(item);
    },
  };

  return (
    <div
      className="Item"
    >
      <div className="Item-title">
        <b>{item.title}</b>
      </div>

      <div className="Item-info">
      {item.quantity 
        ? <div className="Item-quantity">
            {item.quantity} шт
          </div> 
        : null}
        
        <div className="Item-price">
          {item.price * item.quantity || item.price} ₽
        </div>
      </div>

      <div className="Item-actions">
        <Button 
          isAccent={isAccentButton} 
          onClick={callbacks.onAction}
        >{
          isAccentButton ? 'Удалить' : 'Добавить'
        }</Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  isAccentButton: PropTypes.bool.isRequired,
  onAction: PropTypes.func,
};

export default React.memo(Item);
