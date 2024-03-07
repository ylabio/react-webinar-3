import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Total({totalPrice}) {
  return (
    <div className="Total">
    <strong>
      <span className="Total-title">Итого</span>
      <span className="Total-sum">{new Intl.NumberFormat('ru-RU', {style: 'currency', maximumFractionDigits: 0, currency: 'RUB'} ).format(totalPrice)}</span>
    </strong>
  </div>
  )
}

Total.propTypes = {
  totalPrice: PropTypes.number,
}

export default React.memo(Total);