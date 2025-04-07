import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ProductDetails({ details }) {
  return (
    <div className="ProductDetails">
      {details.map((detail, index) => (
        <div className="ProductDetails-detail" key={index}>
          <span>{detail.label}: </span>
          <strong>{detail.value}</strong>
        </div>
      ))}
    </div>
  );
}

ProductDetails.propTypes = {
  details: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired
    })
  ).isRequired
};

export default memo(ProductDetails);