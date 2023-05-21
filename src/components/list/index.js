import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import CartItem from '../cart-item';

function List({list, render}) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          {render(item)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
  render: PropTypes.func.isRequired,
};

List.defaultProps = {
  render: () => {},
};

export default React.memo(List);
