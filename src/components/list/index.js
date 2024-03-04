import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import CartItem from "../cart-item";

function List({ list, action, type }) {
  console.log(action)
  const renderList = (item) => {
    switch (type) {
      case 'cart':
        return <CartItem item={item} deleteFromCart={action} />
      case 'articles':
        return <Item item={item} addToCart={action} />
      default:
        return;
    }
  }
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {renderList(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  addToCart: PropTypes.func
};

List.defaultProps = {
  addToCart: () => {
  },
}

export default React.memo(List);
