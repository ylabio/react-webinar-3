import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import CartItem from '../cart-item';

function List({list, onClick, cart}) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {cart ?  <CartItem item={item} onDelete={onClick}  /> : <Item item={item} onAdd={onClick}/>}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
};

List.defaultProps = {
  onDelete: () => {
  },
  onAdd: () => {
  },
}

export default React.memo(List);
