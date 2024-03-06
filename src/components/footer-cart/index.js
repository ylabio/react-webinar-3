import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function FooterCart({sum}) {
  return (
    <div className='Footer-cart'>
      <span>Итого</span> {sum} ₽
    </div>
  )
}

FooterCart.propTypes = {
  sum: PropTypes.string
};

export default React.memo(FooterCart);
