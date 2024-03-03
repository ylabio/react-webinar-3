import React from "react";
import PropTypes from 'prop-types';
import ClosedCartInfo from '../closedCartInfo';
import Button from '../button/index'
import './style.css';

function Controls({openCart, count, totalPrice}) {
  return (
    <div className='Controls'>
	  <ClosedCartInfo count={count} totalPrice={totalPrice} />
      <Button additionalStyle={{width: '80px'}} callback={openCart} title={'Перейти'} />
    </div>
  )
}

Controls.propTypes = {
	openCart: PropTypes.func,
	count: PropTypes.number,
	totalPrice: PropTypes.number
};

Controls.defaultProps = {
	openCart: () => {}
}

export default React.memo(Controls);
