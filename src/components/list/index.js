import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List(props) {
  return props.list.map((item) => props.render(item));
}

List.propTypes = {
  code: PropTypes.number,
  price: PropTypes.number,
  title: PropTypes.string,
  cnt: PropTypes.number,
  addItem: PropTypes.func,
  deleteItem: PropTypes.func,
};

export default React.memo(List);
