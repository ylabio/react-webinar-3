import React from "react";
import PropTypes from 'prop-types';
import CartItem from "../cart-item";
import './style.css';

function List({list, onAddItem }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <CartItem item={item} itemFunction={onAddItem} button={"Добавить"}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItem: PropTypes.func
};

List.defaultProps = {
  onAddItem: () => {
  },
}

export default React.memo(List);
