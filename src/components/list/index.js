import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onDeleteItem, onSelectItem, onAddItemToCart}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onDelete={onDeleteItem} onSelect={onSelectItem} onAdd={onAddItemToCart} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  onAddItemToCart: PropTypes.func 
};

List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
  onAddItemToCart: () => {},
}

export default React.memo(List);
