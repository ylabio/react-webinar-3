import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list,onAddBasket,onDeleteBasketItem}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item}  onAddBasket={onAddBasket} onDeleteBasketItem={onDeleteBasketItem} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddBasket: PropTypes.func,
  onDeleteBasketItem: PropTypes.func
};

List.defaultProps = {
  onAddBasket: () => {
  },
  onDeleteBasketItem: () => {
  },
}

export default React.memo(List);
