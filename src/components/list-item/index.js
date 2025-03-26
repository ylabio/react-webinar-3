import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ListItem({ children }) {
  return (
    <li className="ListItem">
      {children}
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
};

export default React.memo(ListItem);
