import PropTypes from 'prop-types';
import { useState, memo } from 'react';

import './style.css';

const PaginationLimit = ({ onChange = () => {}, limit = 0 }) => {
  const handleChange = event => {
    const value = +event.target.value;
    onChange(value);
  };

  return (
    <div className={'PaginationLimit'}>
      <label htmlFor="PaginationLimit-select">Количество товаров на странице:</label>
      <select id="PaginationLimit-select" value={limit} onChange={handleChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

PaginationLimit.propTypes = {
  onChange: PropTypes.func.isRequired,
  count: PropTypes.number,
};

export default memo(PaginationLimit);
