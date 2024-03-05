import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, addToBasketItem = null, deleteItem = null, getBasket, place}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} addToBasket={addToBasketItem} deleteItem={deleteItem} getBasket={getBasket} place={place}/>
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
  getBasket: PropTypes.func,
};

List.defaultProps = {
  addToBasketItem: () => {
  },
  getBasket: () => {},
}

export default React.memo(List);
