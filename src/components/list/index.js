import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({list, onAddItemToCart, onDeleteItemFromCart, inCart = false}) {

  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item 
            item={item} 
            onAddItemToCart={onAddItemToCart} 
            onDeleteItemFromCart={onDeleteItemFromCart} 
            inCart={inCart}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItemToCart: PropTypes.func.isRequired,
  onDeleteItemFromCart: PropTypes.func.isRequired,
  inCart: PropTypes.bool
};

List.defaultProps = {
  onAddItemToCart:() => {
  },
  onDeleteItemFromCart: () => {
  },
  inCart: false
}

export default React.memo(List);
