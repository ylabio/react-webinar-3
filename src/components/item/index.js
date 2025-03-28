import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Button from '../button/index';

import './style.css';

function Item({ item, quantity, onAddItem, onDeleteItem }) {
  const cn = bem('Item');

  const handleAdd = useCallback(
    e => {
      e.stopPropagation();
      onAddItem(item.code);
    },
    [onAddItem, item.code],
  );

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
      <span className={cn('quantity')}>{quantity ? `${item?.quantity} шт` : ''} </span>
      <span className={cn('price')}>{item.price.toLocaleString('ru-RU')} ₽</span>
      <div className={cn('actions')}>
        {onAddItem && (
          <Button onClick={handleAdd} variant="solid" label="Добавить">
            Добавить
          </Button>
        )}
        {onDeleteItem && (
          <Button onClick={handleDelete} variant="delete" label="Удалить">
            Удалить
          </Button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  quantity: PropTypes.number,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default React.memo(Item);
