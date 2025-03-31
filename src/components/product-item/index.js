import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import AddButton from '../add-button';
import './style.css';

function ProductItem({ item, onAddToCart }) {
  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-container">
        <span>{`${numberFormat(item.price)}`} ₽</span>
        <AddButton onClick={() => onAddToCart(item.code)} />
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(ProductItem);
