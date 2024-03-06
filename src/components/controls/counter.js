import PropTypes from 'prop-types';
import React from 'react';
import "./style.css"

export const Counter = ({ totalPrice }) => <b className="Controls-counter">Итого <span>{totalPrice} ₽</span></b>

Counter.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};