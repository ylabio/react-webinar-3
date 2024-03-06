import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import CartItem from '../cart-item';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List(props) {

  const cn = bem('List');

  return (
    <div className={cn()}>
      {props.list.map(item =>
        <div key={item.code} className={cn('item')}>
          {props.isList&&<Item item={item} inList={true} inCartList={false} onAdd={props.onAddItemToCart}/>}
          {props.isCartList&&<CartItem item={item} onDelete={props.onDeleteItem}/>}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  onAddItemToCart: PropTypes.func,
  onDeleteItem: PropTypes.func,
  Item: PropTypes.func,
  isList: PropTypes.bool,
  isCartList: PropTypes.bool
};

List.defaultProps = {
  onAddItemToCart: () => {
  },
  onDeleteItem: () => {
  },
}

export default React.memo(List);
