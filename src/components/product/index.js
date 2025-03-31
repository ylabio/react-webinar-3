import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {formatPrice} from "../../utils";

function Product({ product, onAddToCart = (_) => {} }) {
  const callbacks = {
    onAddToCart: e => {
      e.stopPropagation();
      onAddToCart(product);
    },
  };

  return (
    <div className="Product">
      <div className="Product-title">{product.title}</div>
      <div className="Product-price">{formatPrice(product.price)}</div>
      <div className="Product-actions">
        <button onClick={callbacks.onAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

export default React.memo(Product);
