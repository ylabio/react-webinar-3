import React from 'react';
import Item from '../item';
import './style.css'
import PropTypes from 'prop-types';

function CartList(props) {
  return (
    <div className='CartList'>
      {props.cartList&&props.cartList.map(item =>
        <div key={item.code} className='CartList-item'>
          <Item item={item} inList={false} inCartList={true} onDelete={props.onDeleteItem}/>
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