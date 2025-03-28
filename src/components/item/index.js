import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item({onAction = () => {}, ...props}) {
  const callbacks = {
    onAction: e => {
      e.stopPropagation();
      onAction(props.item.code);
    },
  };

  return (
    <div
      className='Item'
    >
      <div className="Item-title">
        <b>{props.item.title}</b>
        {props.withCounter && props.item.addedToCartCount > 0
          ? `${props.item.addedToCartCount} шт.`
          : ''}
        <p>{props.item.price} ₽</p>
      </div>
      <div className={"Item-actions" + (props.actionType === 'add' ? ' Add' : ' Delete')}>
        <button onClick={callbacks.onAction}>{props.actionType === 'add' ? 'Добавить' : 'Удалить'}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    addedToCartCount: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func,
  actionType:  PropTypes.string,
  withCounter:  PropTypes.bool,
};

export default React.memo(Item);
