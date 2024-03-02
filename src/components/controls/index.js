import React from "react";
import PropTypes from 'prop-types';
import CartInfo from '../cart-info/index'
import Button from '../button/index'
import './style.css';

function Controls({callbacks ,count , totalSumm}) {
  return (
    <div className='Controls'>
       <CartInfo count={count} totalSumm={totalSumm}/>
       <Button callback={callbacks.onOpenCart}  title={'Перейти'}/>
    </div>
  )
}

Controls.propTypes = {
  callbacks: PropTypes.object,
  count: PropTypes.number,
  totalSumm: PropTypes.number,
};

Controls.defaultProps = {
  callbacks: {}
}

export default React.memo(Controls);
