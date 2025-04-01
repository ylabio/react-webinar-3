import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import CartItem from '../cartItem';
import './style.css';
function Cart({ cart = [], cartSummary, onRemove = () => { } }) {
  const handleRemove = useCallback((code) => {
    onRemove(code);
  }, [cart]);

  return (
    <div className="Cart">
      <h1>Корзина</h1>
      <List
        items={cart}
        renderItem={item => <CartItem item={item} onRemove={handleRemove} />}
      />
      <div className="Total">
        <div className="Total-price">
          <span>Итого:</span>
          <span>{cartSummary.totalPrice.toLocaleString('ru')} ₽</span>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  cartSummary: PropTypes.shape({
    totalPrice: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(Cart);
