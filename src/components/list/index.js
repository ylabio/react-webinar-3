import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import BasketItem from "../basket-item";
import './style.css';

function List({list, onClick, isInBasket}) {
  return (
    <div className="List">{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {
            isInBasket
            ? <BasketItem item={item} onClick={onClick}/>
            : <Item item={item} onClick={onClick}/>
          }
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func,
  isInBasket: PropTypes.bool
};

List.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(List);
