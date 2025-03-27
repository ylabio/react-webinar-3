import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list = [], handlerListItem = () => { }, nameButton = '', classActionButton = '' }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} id={item.code} className="List-item">
          <Item
            item={item}
            handler={handlerListItem}
            nameButton={nameButton}
            classActionButton={classActionButton}
          />
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
  handlerListItem: PropTypes.func,
  nameButton: PropTypes.string,
  classActionButton: PropTypes.string,
};

export default React.memo(List);
