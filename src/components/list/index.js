import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import ModalItem from '../modal-item';
import './style.css';
function List({ list, onAdd = () => { }, onDelete = () => { } }) {
  return (
    <ul className="List">
      {list.map((item) => {
        if (item.type === 'item') {
          return (
            <li key={item.code} className="List-item">
              <Item key={item.code} item={item} onAdd={onAdd} />
            </li>
          );
        } else if (item.type === 'modalItem') {
          return (
            <li key={item.code} className="List-item">
              <ModalItem key={item.code} item={item} onDelete={onDelete} />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(List);
