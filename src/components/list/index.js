import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddItemToBasket, onDeleteItemFromBasket, isBasket}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAddItemToBasket={onAddItemToBasket} onDeleteItemFromBasket={onDeleteItemFromBasket} isBasket={isBasket} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItemToBasket: PropTypes.func,
  onDeleteItemFromBasket: PropTypes.func,
  isBasket: PropTypes.bool
};

List.defaultProps = {
  onAddItemToBasket: () => {},
  onDeleteItemFromBasket: () => {},
  isBasket: false
}

export default React.memo(List);
