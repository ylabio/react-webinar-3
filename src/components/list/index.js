import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import CartItem from "../cart-item";

function List({ list, action, type }) {
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
  type: 'cart' || 'articles',
  action: PropTypes.func
};

List.defaultProps = {
  action: () => {
  },
}

export default React.memo(List);
