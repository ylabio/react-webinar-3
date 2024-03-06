import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { formatPrice } from "../../utils";

function BasketTotal(props) {

  return (
    <div className='BasketTotal'>
      <div className='BasketTotal-cost'>
        <p className='BasketTotal-cost-title'>Итого: </p>
        <div className='BasketTotal-cost-number'>{formatPrice(props.totalCost())} ₽</div>
      </div>
    </div>
  );
}

BasketTotal.propTypes = {
  totalCost: PropTypes.func,
}

BasketTotal.defaultProps = {
  totalCost: () => {
  }
}

export default React.memo(BasketTotal);