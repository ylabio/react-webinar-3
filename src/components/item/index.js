import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ variant = 'default', item, onAdd = () => {}, onDelete = () => {} }) {
  const cn = bem('Item');
  const callbacks = {
    onClick: () => {
      if (variant === 'cart') {
        onDelete(item.code);
        return;
      } else {
        onAdd(item.code);
      }
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <b>{item.title}</b>
      </div>
      <div className={cn('actions')}>
        {variant === 'cart' && <span className={cn('actions-count')}>{item.cartCount} шт</span>}
        <span className={cn('actions-price')}>
          {Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0,
          }).format(item.price)}
        </span>

        {variant === 'cart' ? (
          <button className={cn('actions-delete')} onClick={callbacks.onClick}>
            Удалить
          </button>
        ) : (
          <button className={cn('actions-add')} onClick={callbacks.onClick}>
            Добавить
          </button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  variant: PropTypes.string,
  item: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Item);
