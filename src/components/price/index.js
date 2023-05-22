import React from "react";
import PropTypes from "prop-types";

function Price({amount, currency}) {
  const price = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
    style: 'currency', currency: currency
  }).format(amount)

  return (
    <span>{price}</span>
  );
}

Price.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default React.memo(Price);
