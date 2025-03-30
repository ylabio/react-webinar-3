import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import CartItem from '../cart-item/cart-item.js';
import './style.css';
import { formatPrice } from '../../utils.js';

function CartList({ items, onDeleteItem, totalPrice }) {
  return (
    <>
      <div className="Modal__body">
        <List
          items={Object.values(items)}
          renderItem={item => {
            if (!item) return null;
            return <CartItem item={item} onDeleteItem={() => onDeleteItem(item.id)} />;
          }}
        />
      </div>
      <div className="Modal__footer">
        <b>Итого:</b>
        <b>{formatPrice(totalPrice)}</b>
      </div>
    </>
  );
}

CartList.propTypes = {
  items: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default React.memo(CartList);
