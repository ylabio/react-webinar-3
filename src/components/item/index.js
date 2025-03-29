import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { price_format } from '../../utils';

function Item({ item = { code: 0, title: '', price: 0, count: 0}, onAdd = () => {}, onDelete = () => {}, isCart = '' }) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: () => {
      onAdd(item.code);
    },

    onDelete: () => {
      onDelete(item.code);
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <b>{item.title}</b>
      </div>
      <div className={cn('count')}>
        {isCart ? `${item.count} шт` : ''}
      </div>
      <div className={cn('price')}>
        {item.price ? price_format(item.price) : `0 ₽`}
      </div>
      <div className={cn('actions')}>
        {isCart
          ?
          <button className="Btn-delete" onClick={callbacks.onDelete}>Удалить</button>
          :
          <button className="Btn-add" onClick={callbacks.onAdd}>Добавить</button>
        }
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Item);