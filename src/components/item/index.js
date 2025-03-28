import React from 'react';
import PropTypes from 'prop-types';
import ItemDetails from './item-details';
import ItemActions from './item-actions';
import { formatNumber } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ item, onAddToCart = () => {}, onRemoveFromCart = null }) {
  const cn = bem('Item');
  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation();
      onAddToCart(item.code);
    },
    onRemoveFromCart: (e) => {
      e.stopPropagation();
      onRemoveFromCart(item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{item.title}</div>
      <ItemDetails price={formatNumber(item.price)} count={item.count} />
      <ItemActions
        onAddToCart={onRemoveFromCart ? null : callbacks.onAddToCart}
        onRemoveFromCart={onRemoveFromCart ? callbacks.onRemoveFromCart : null}
      />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

export default React.memo(Item);
