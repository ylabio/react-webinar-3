import React from "react";
import PropTypes from 'prop-types';
import CartInfo from '../cart-info/index'
import './style.css';

function Controls({goToCart ,count , totalSumm}) {
  return (
    <div className='Controls'>
       <CartInfo count={count} totalSumm={totalSumm}/>
       <div className='controls-actions'>
        <button onClick={() => goToCart()}>Перейти</button>
       </div>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
