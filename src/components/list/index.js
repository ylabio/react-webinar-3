import React, { memo } from 'react';
import './style.css';
import Item from '../item';
import PropTypes from 'prop-types';

const List = ({ list, onAddItem}) => {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            onAddItem={onAddItem}
          />
        </div>
      ))}
    </div>
  );
};

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      selectCount: PropTypes.number,
      selected: PropTypes.bool,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

export default memo(List);
