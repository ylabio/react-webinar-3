import React from 'react';
import PropTypes from 'prop-types';
import ModalItem from '../modalItem';
import './style.css';

function List({ list, onDeleteItem, onSelectItem }) {
  return (
    <ul className="Modal__List">
      {list.map(item => (
        <li key={item.code} className="Modal__List-item">
          <ModalItem item={item} onDelete={onDeleteItem} onSelect={onSelectItem} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => { },
  onSelectItem: () => { },
};

export default React.memo(List);
