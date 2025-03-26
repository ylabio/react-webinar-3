import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartProduct({ cartProduct, onDeleteFromCart = _ => {} }) {
  const callbacks = {
    onDeleteFromCart: e => {
      e.stopPropagation();
      onDeleteFromCart(cartProduct.code);
    },
  };

  return (
    <div className="CartProduct">
      <div className="CartProduct-title">{cartProduct.title}</div>
      <div className="CartProduct-quantity">{cartProduct.quantity} шт</div>
      <div className="CartProduct-price">{cartProduct.price * cartProduct.quantity} &#8381;</div>
      <div className="CartProduct-actions">
        <button onClick={callbacks.onDeleteFromCart}>Удалить</button>
      </div>
    </div>
  );
}

CartProduct.propTypes = {
  cartProduct: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onDeleteFromCart: PropTypes.func,
};

export default React.memo(CartProduct);
