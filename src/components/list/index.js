import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, addToBasketItem, addToBasketCount}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} addToBasket={addToBasketItem} addToBasketCount={addToBasketCount} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  addToBasketItem: PropTypes.func,
  addToBasketCount: PropTypes.func,
};

List.defaultProps = {
  addToBasketItem: () => {
  },
  addToBasketCount: () => {},
}

export default React.memo(List);
