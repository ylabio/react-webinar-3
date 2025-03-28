import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemDetails({ price, count }) {
  return (
    <div className="ItemDetails">
      {count !== undefined && (
        <span className="ItemDetails-count">
          {count}&nbsp;шт
        </span>
      )}
      <span className="ItemDetails-price">
        {price}
      </span>
    </div>
  );
}

ItemDetails.propTypes = {
  price: PropTypes.string.isRequired,
  count: PropTypes.number,
};

export default React.memo(ItemDetails);
