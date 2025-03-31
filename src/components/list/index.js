import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ Component = {}, list = [], onClickBtn = () => {} }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li className="List-item" key={item.code}>
          <Component item={item} onClickBtn={onClickBtn} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  Component: PropTypes.object,
  list: PropTypes.array,
  onClickBtn: PropTypes.func,
};

export default React.memo(List);
