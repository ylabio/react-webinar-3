import React from "react";
import PropTypes from 'prop-types';
import { STRINGS } from "../../const";
import { formatPrice } from "../../utils";
import './style.css';

function FinalCost({
  show,
  totalAmount,
  label = STRINGS.FINAL,
}) {
  const cost = formatPrice(totalAmount);

  if (!show) return null;

  return (
    <>
      <div className="Container-final-cost">
        <div>{label}</div>
        <div className="Cost">{cost}</div>
      </div>
    </>
  );
}

FinalCost.propTypes = {
  show: PropTypes.bool.isRequired,
  totalAmount: PropTypes.number.isRequired,
  label: PropTypes.string,
};

export default React.memo(FinalCost);