import React from 'react';
import PropTypes from 'prop-types';
import ModalItem from '../modal-item';
import './style.css';

function ModalList({ newlist, onDeleteItem = () => { } }) {
  if (!newlist) {
    return null;
  }
  return (
    <ul className="Modal__list">
      {newlist.map(item => (
        <li key={item.code} className="Modal__list-item">
          <ModalItem item={item} onDelete={onDeleteItem} />
        </li>
      ))}
    </ul>
  );
}

ModalList.propTypes = {
  newlist: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
};

export default React.memo(ModalList);
