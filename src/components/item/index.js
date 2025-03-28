import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';
import Button from '../button'

function Item(props) {

  const callbacks = {
    onAction: e => {
      e.stopPropagation();
      props.onAction(props.item);
    },
  };

  return (
    <div
      className="Item" 
      onClick={callbacks.onClick}
    >
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>

      <div className="Item-info">
      {props.item.quantity 
        ? <div className="Item-quantity">
            {props.item.quantity} шт
          </div> 
        : null}
        
        <div className="Item-price">{props.item.price} ₽</div>
      </div>

      <div className="Item-actions">
        <Button isAccent={props.isAccentButton} onClick={callbacks.onAction}>Добавить</Button>
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

Item.defaultProps = {
  onAction: () => {}
};

export default React.memo(Item);
