import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import ItemCart from "../cart/item-cart";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function List({list, orders, onAddToOrder, onDeleteItem}){

  const cn = bem('List');

  return (
    <div className={cn()}>
      {
        list &&
        list.map(item =>
          <div key={item.code} className={cn('item')}>
            <Item item={item} onAddToOrder={onAddToOrder}/>         
          </div>
        )
      }
      {
        orders &&
        orders.map(item =>
          <div key={item.code} className={cn('item')}>
            <ItemCart item={item} onDeleteItem={onDeleteItem}/>         
          </div>
        )       
      }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  orders: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  onAddToOrder: PropTypes.func,
  onDeleteItem: PropTypes.func
};

List.defaultProps = {
  onAddToOrder: () => {},
  onDeleteItem: () => {}
}

export default React.memo(List);
