import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddItem, onSelectItem}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {/* <Item item={item} onDelete={onDeleteItem} onSelect={onSelectItem}/> */}
          <Item item={item} onAdd={onAddItem} onSelect={onSelectItem}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  // onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  onSelectItem: PropTypes.func
};

List.defaultProps = {
  // onDeleteItem: () => {
  // },
  onAddItem: () => {
  },
  onSelectItem: () => {
  },
}

export default React.memo(List);
