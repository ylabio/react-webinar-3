import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Button from '../button/index';

import './style.css';

function CartItem({ item, onDeleteItem }) {
  const cn = bem('CartItem');

  const handleDelete = useCallback(
    e => {
      e.stopPropagation();
      onDeleteItem(item.code);
    },
    [onDeleteItem, item.code],
  );

  return (
    <div className={cn()}>
      <div className={cn('title')}>{item.title}</div>
      <span className={cn('quantity')}>{item.quantity} шт</span>
      <span className={cn('price')}>{item.price.toLocaleString('ru-RU')} ₽</span>
      <div className={cn('actions')}>
        <Button onClick={handleDelete} variant="delete" label="Удалить">
          Удалить
        </Button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

export default React.memo(CartItem);
