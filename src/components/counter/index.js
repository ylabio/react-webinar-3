import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils.js";

function Counter ({number}) {
  return (
    <span> | {`Выделяли ${number} ${plural(number, {one: 'раз', few: 'раза', many: 'раз'})}`}</span>
  )
}

Counter.propTypes = {
  number: PropTypes.number.isRequired,
}

export default Counter;
