import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list = [], ItemComponent = () => null, handlerItem = () => { } }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} id={item.code} className="List-item">
          <ItemComponent item={item} handlerItem={handlerItem} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
  ItemComponent: PropTypes.elementType,
  handlerItem: PropTypes.func,
};

export default React.memo(List);
