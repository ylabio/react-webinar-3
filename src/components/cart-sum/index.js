import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import './style.css';

function CartSum({totalSum}) {
  const price = formatPrice(totalSum);

  return (
    <div className='Cart-sum'>
      <p>Итого</p>
      <p className='Cart-sum-price'>{price}</p>
    </div>
  );
}

CartSum.propTypes = {
  totalSum: PropTypes.number
};

CartSum.defaultProps = {
  totalSum: 0
}

export default React.memo(CartSum);
