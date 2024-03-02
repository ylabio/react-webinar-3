import React from 'react';
import PropTypes from 'prop-types';
import { getPrice, getSum } from '../../utils';
import './style.css';

function CartSum({data}) {
  const price = getPrice(getSum(data));

  return (
    <div className='Cart-sum'>
      <p>Итого</p>
      <p className='Cart-sum-price'>{price}</p>
    </div>
  );
}

CartSum.propTypes = {
  data: PropTypes.array
};

CartSum.defaultProps = {
  data: []
}

export default React.memo(CartSum);
