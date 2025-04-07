import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ProductDescription({ description }) {
  return (
    <div className="ProductDescription">
      <p>{description}</p>
    </div>
  );
}

ProductDescription.propTypes = {
  description: PropTypes.string.isRequired
};

export default memo(ProductDescription);