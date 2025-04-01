import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatNumber } from '../../utils';
import { cn as bem } from '@bem-react/classname';

function Item({item, onAddToCart}) {
  const cn = bem('Item');
    return (
    <div className= {cn()}>
      <div className={cn('title')}>
        <b>{item.title}</b>        
      </div>
      <div className={cn('price')}>
        <b>{formatNumber(item.price)} ₽ </b>        
      </div>
      <div className={cn('actions')}>
        <button onClick={() => onAddToCart(item.code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(Item);
