import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddToCart, isCart, remove}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item
            item={item}
            onAddToCart={onAddToCart}
            isCart={isCart}
            remove={remove}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddToCart: PropTypes.func,
  isCart: PropTypes.bool,
  remove: PropTypes.func
};

List.defaultProps = {
  onAddToCart: () => {},
  remove: () => {},
  isCart: false,
}

export default React.memo(List);
