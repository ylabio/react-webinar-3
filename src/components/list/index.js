import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddItem, ElementView, onDeleteItem}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <ElementView item={item} onAdd={onAddItem} onDelete={onDeleteItem}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  ElementView: PropTypes.elementType.isRequired,
};

List.defaultProps = {
  onAddItem: () => {},
  onDeleteItem: () => {},
}

export default React.memo(List);
