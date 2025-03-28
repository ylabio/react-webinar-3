import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item({ item, onAction = () => {}, style="add" }) {
  
  const buttonTitle = style === 'add' ? 'Добавить' : style === 'delete' ? 'Удалить' : 'empty';

  const callbacks = {
    onAction: e => {
      e.stopPropagation();
      onAction(item);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      {item.amount && <div className='Item-amount'>{item.amount} шт</div>}
      <div className="Item-price">{item.price.toLocaleString('ru-RU')} ₽</div>
      <div className="Item-actions">
        <button className={style} onClick={callbacks.onAction}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    amount: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  style: PropTypes.string,
  onAction: PropTypes.func,
};

export default React.memo(Item);
