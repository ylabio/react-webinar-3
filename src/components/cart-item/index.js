import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { price_format } from '../../utils';

function CartItem({ item = { code: 0, title: '', price: 0, count: 0}, onDelete = () => {} }) {
  const cn = bem('CartItem');

  const callbacks = {
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
        {item.count} шт
      </div>
      <div className={cn('price')}>
        {item.price ? price_format(item.price) : `0 ₽`}
      </div>
      <div className={cn('actions')}>
          <button className="Btn-delete" onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
    
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(CartItem);