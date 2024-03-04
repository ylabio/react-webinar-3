import React from "react";
import PropTypes from 'prop-types';
import CartInfo from "../cart-info";
import Button from "../button"

import './style.css';

function Controls({cartInfo, handleCartModalOpen}) {
  return (
    <div className='Controls'>
      <CartInfo cartInfo={cartInfo}/>
      <Button onClick={handleCartModalOpen}>Перейти</Button>
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
