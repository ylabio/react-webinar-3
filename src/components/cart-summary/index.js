import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { formatPrice } from "../../utils";

function CartSummary({totalAmount}) {
  const cn = bem('CartSummary');
  return (
    <div className={cn()}>
      <span>Итого</span>
      <span>{formatPrice(totalAmount)} ₽</span>
    </div>

  )
}

CartSummary.propTypes = {
  totalAmount: PropTypes.number.isRequired,
};

export default React.memo(CartSummary);
