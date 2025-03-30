import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function TotalBascet({sum}) {
    return (
       <div className='TotalBasket'>Итого: <span>{sum} ₽</span></div>
    );
  }

  TotalBascet.propTypes = {
    sum: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
 };

  export default React.memo(TotalBascet);