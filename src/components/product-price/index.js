import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ProductPrice({ price, label }) {
  return (
    <div className="ProductPrice">
      <span>{label}: </span>
      <strong>{price}</strong>
    </div>
  );
}

ProductPrice.propTypes = {
  price: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

export default memo(ProductPrice);