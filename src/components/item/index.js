import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';

function Item(props) {
  // Счётчик выделений

  // const callbacks = {
  //   onClick: () => {
  //     props.onSelect(props.item.code);
  //     if (!props.item.selected) {
  //       setCount(count + 1);
  //     }
  //   },
  // };
  const callback = e => {
    e.stopPropagation();
    props.callback(props.item.code);
  }
  
  if (props.isCartItem) {
    return (
      <div
        className={'Item' + (props.item.selected ? ' Item_selected' : '')}
      >
        <div className="Item-title">
          <div><b>{props.item.title}</b></div>
          <div className="Item-title-description">
            <div>{`${props.item.amount} шт`}</div>
            <div>
              {props.item.price
              ? `${props.item.price.toLocaleString('ru-RU')} ₽`
              : ''}
            </div>
          </div>
        </div>
        <div className="Item-actions">
          <Button type='red' onClick={callback}>Удалить</Button>
        </div>
    </div>
    )
  }

  return (
    <div
      className={'Item' + (props.item.selected ? ' Item_selected' : '')}
    >
      <div className="Item-title">
        <div><b>{props.item.title}</b></div>
        <div>
          {props.item.price
          ? `${props.item.price.toLocaleString('ru-RU')} ₽`
          : '0 ₽'}
        </div>
      </div>
      <div className="Item-actions">
        <Button type='purple' onClick={callback}>Добавить</Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  callback: PropTypes.func,
  isCartItem: PropTypes.bool,
};


export default React.memo(Item);
