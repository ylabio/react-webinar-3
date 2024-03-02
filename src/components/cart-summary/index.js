import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice, getSummary } from '../../utils';
import { RUR } from '../../constants/currency-signs';
import './style.css';

function CartSummary({data}) {
  return (
    <div className='Cart-summary'>
      <p>Итого</p>
      <p className='Cart-summary-price'>{formatPrice(getSummary(data))} {RUR}</p>
    </div>
  );
}

CartSummary.propTypes = {
  data: PropTypes.array
};

CartSummary.defaultProps = {
  data: []
}

export default React.memo(CartSummary);
