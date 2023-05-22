import React from "react";
import './style.css';
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {RUBLE_CODE} from "../../../constants";
import Price from "../../price";

function Summary({totalPrice}) {
  const cn = bem('Summary');

  return (
    <div className={cn()}>
      <span className={cn('text')}>Итого</span>
      <Price amount={totalPrice} currency={RUBLE_CODE}/>
    </div>
  );
}

Summary.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(Summary);
