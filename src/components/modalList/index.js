import React from 'react';
import PropTypes from 'prop-types';
import ModalItem from '../modalItem';
import './style.css';

function ModalList({ newlist, onDeleteItem }) {
  if (!newlist) {
    return null;
  }
  return (
    <ul className="Modal__List">
      {newlist.map(item => (
        <li key={item.code} className="Modal__List-item">
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

ModalList.defaultProps = {
  onDeleteItem: () => { },
};

export default React.memo(ModalList);
