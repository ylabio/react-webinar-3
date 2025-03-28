import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function BasketItem ({ basketItem, onDell=() => {} }) {
  const cn = bem('Basket-item');
  
  return (
      <div className={cn()}>
        <div className={cn('title')}>
          <b>{basketItem.item.title}</b>
          <div className='info'>
            <span className="count">{basketItem.count} шт</span>
            <span className="price">{basketItem.item.price} ₽</span>
          </div>
        </div>
        <div className={cn('actions')}>
          <button onClick={() => { onDell(basketItem.item.code) }}>Удалить</button>
        </div>
      </div>
    );
}

BasketItem.propTypes = {
  basketItem: PropTypes.shape({
    count: PropTypes.number,
    item: PropTypes.shape({
      code: PropTypes.number, 
      title: PropTypes.string, 
      price: PropTypes.number
    })
  }),
  onDell: PropTypes.func
}

export default React.memo(BasketItem);