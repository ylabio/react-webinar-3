import React from 'react';
import './style.css'
import PropTypes from 'prop-types';

const ShopSum = ({ list }) => {
  return (
    <React.Fragment>
      {list.reduce((acc, i) => acc + i.price * i.amount, 0).toLocaleString()} ₽
    </React.Fragment>
  );
};

ShopSum.propTypes = {
  list: PropTypes.array
}

export default React.memo(ShopSum);
