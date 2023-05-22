import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Counter({count, unit}) {
  const cn = bem('Counter');

  return (
    <span className={cn()}>{count} {unit}</span>
  );
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default Counter;
