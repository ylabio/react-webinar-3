import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list = [], renderItem = () => {} }) {
  if (list.length === 0) return null;

  return (
    <ul className="List">
      {list.map(renderItem).map((item, i) => (
        <li key={list[i].code}>{item}</li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renderItem: PropTypes.func,
};

export default memo(List);
