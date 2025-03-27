import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import CartItem from '../cart-item/index'
import { cn as bem } from '@bem-react/classname';

function List({ 
  list, 
  onAddItemtoCart = ()=>{}, 
  onDeleteItemfromCart = ()=>{}, 
  cartitem = false}) {

  const cn = bem("List")

  if (cartitem){
    return(
      <ul className={cn()}>
      {list.map(item => (
        <li key={item.code} className={cn("item")}>
          <CartItem item={item} onDeleteItemfromCart={onDeleteItemfromCart}/>
        </li>
      ))}
    </ul>
    )
  }

  return (
    <ul className={cn()}>
      {list.map(item => (
        <li key={item.code} className={cn("item")}>
          <Item item={item} onAddItemtoCart={onAddItemtoCart}/>
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  cartitem: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onAddItemtoCart: PropTypes.func,
  onDeleteItemfromCart: PropTypes.func
};

// List.defaultProps = {
//   onDeleteItem: () => {},
//   onSelectItem: () => {},
// };

export default React.memo(List);
