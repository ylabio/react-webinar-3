import React from "react";
import PropTypes from 'prop-types';
import CartInfo from "../cart-info";

import './style.css';

function Controls({cartInfo, handleCartModalOpen}) {
  return (
    <div className='Controls'>
      <CartInfo cartInfo={cartInfo}/>
      <button className={'Controls-button'} onClick={handleCartModalOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onCartOpen: PropTypes.func,
  cartInfo: PropTypes.shape({
    count: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
};

Controls.defaultProps = {
  onCartOpen: () => {},
  cartInfo: {}
}

export default React.memo(Controls);
