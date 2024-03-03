import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function CartList({cartList, onDeleteItem}) {
  return (
    <div className='CartList'>{
      cartList.map(item =>
        <div key={item.code} className='CartList-item'>
          <Item item={item} amount={item.amount} onClick={onDeleteItem} buttonText="Удалить"/>
        </div>
      )}
    </div>
  )
}

CartList.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
};

CartList.defaultProps = {
  onDeleteItem: () => {
  },
}

export default React.memo(CartList);