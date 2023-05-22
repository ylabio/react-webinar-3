import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddToBasket, onDeleteFromBasket, basket}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item}
                onButtonClick={basket ? onDeleteFromBasket : onAddToBasket}
                basket={basket}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddToBasket: PropTypes.func,
  onDeleteFromBasket:PropTypes.func,
  basket: PropTypes.bool
};

List.defaultProps = {
  onAddToBasket: () => {},
  onDeleteFromBasket: () => {},
  basket: false
}

export default React.memo(List);
