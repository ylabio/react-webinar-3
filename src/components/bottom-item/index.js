import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Currency from "../../currencySymbol.js";

function BottomItem({onAmountPrice}) {
  return (
    <div className='ItemBottom'>
      <div className='ItemBottom-title'>
        Итого
      </div>
      <div className='ItemBottom-amount-price'> 
        <Currency currency="rub" value={onAmountPrice()}/>
      </div>
      <div className='ItemBottom-empty'>
      </div>
    </div>
  )
}

BottomItem.propTypes = {
  onAmountPrice: PropTypes.func
};

BottomItem.defaultProps = {
  onAmountPrice: () => {}
}

export default React.memo(BottomItem);
