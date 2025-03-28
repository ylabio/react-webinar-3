import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalContent({ title, count, price, onDelete }) {
  return (
    <div className="product-item">
      <div className="product-info">
        <span className="product-name">{title}</span>
      </div>
      <div className="product-details">
        <span className="quantity">{count} шт</span>
        <span className="price">{price * count} ₽</span>
        <button
          className="delete-button"
          onClick={onDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  )
}

ModalContent.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default React.memo(ModalContent);
