import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import ItemCart from "../item-cart";

function List({ list, onAddCart, onDeleteItem, isCart }) {
  return (
    <div className={isCart ? 'List-cart' : 'List'}>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {isCart
            ? <ItemCart item={item} onDeleteItem={onDeleteItem} />
            : <Item item={item} onAddCart={onAddCart} />
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
  onDeleteItem: PropTypes.func,
  onAddCart: PropTypes.func,
  isCart: PropTypes.bool
};

List.defaultProps = {
  onDeleteItem: () => { },
  onAddCart: () => { },
}

export default React.memo(List);
