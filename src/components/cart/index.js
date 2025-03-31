import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Cart({
    children
}) {

  return (
    <div className='Cart-modal'>
        <div className='Cart-container'>
            {children}
        </div>
    </div>
  );
}

Cart.propTypes = {
    children: PropTypes.node,
};

export default Cart;
