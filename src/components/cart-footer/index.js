import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {formattedNumber} from "../../utils";

function CartFooter({total = 0}) {

  return (
    <div className="CartFooter">
      <b className="title">Итого:</b>
      <b className="price">{formattedNumber(total)} ₽</b>
    </div>
  );
}

CartFooter.propTypes = {
  total: PropTypes.number.isRequired,
};


export default React.memo(CartFooter);
