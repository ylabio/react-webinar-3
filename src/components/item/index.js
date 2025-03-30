import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import Controls from '../controls';
import './style.css';

function Item({ item, onAddToCart, onDeleteFromCart, inCart }) {
  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-container">
        {inCart && <span className="item-span-left">{item.quantity} шт</span>}
        <span>{`${numberFormat(item.price)}`} ₽</span>
        <Controls
          inCart={inCart}
          onAddToCart={onAddToCart}
          onDeleteFromCart={onDeleteFromCart}
          itemCode={item.code}
        />
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
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
  inCart: PropTypes.bool.isRequired,
};

export default React.memo(Item);
