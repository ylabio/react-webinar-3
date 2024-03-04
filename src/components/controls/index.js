import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({goToBasket, addToBasketCount}) {
  return (
    <div className='Controls'>
      <div>Basket: {addToBasketCount() === 0 ? 'Empty' : addToBasketCount()}</div>
      <button onClick={() => goToBasket()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  goToBasket: PropTypes.func,
  addToBasketCount: PropTypes.func,
};

Controls.defaultProps = {
  goToBasket: () => {},
  addToBasketCount: () => {},
}

export default React.memo(Controls);
