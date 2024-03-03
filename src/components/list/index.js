import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, inCart, addToCart, removeFromCart}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} inCart={inCart} addToCart={addToCart} removeFromCart={removeFromCart} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  inCart: PropTypes.bool,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func
};

List.defaultProps = {
  addToCart: () => {
  },
  removeFromCart: () => {
  },
}

export default React.memo(List);
