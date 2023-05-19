import './style.css'
import React from "react";
import {priceFormatCreator} from "../../utils";
import PropTypes from "prop-types";

function BasketTotal ({totalPrice}) {
  return (
    <div className={'basket-total'}>
      Итого
      <div className={'basket-total__count'}>
        {`${priceFormatCreator(totalPrice)} ₽`}
      </div>
    </div>
  )
}

BasketTotal.propTypes = {
  totalPrice: PropTypes.number,
};

export default React.memo(BasketTotal);