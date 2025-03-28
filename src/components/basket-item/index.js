import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function BasketItem ({ item, onDell=() => {} }) {
  const cn = bem('Basket-item');
  
  return (
      <div className={cn()}>
        <div className={cn('title')}>
          <b>{item.title}</b>
          <div className='info'>
            <span className="count">{item.count} шт</span>
            <span className="price">{item.price} ₽</span>
          </div>
        </div>
        <div className={cn('actions')}>
          <button onClick={() => { onDell(item.code) }}>Удалить</button>
        </div>
      </div>
    );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number, 
    title: PropTypes.string, 
    price: PropTypes.number
  }),
  onDell: PropTypes.func
}

export default React.memo(BasketItem);