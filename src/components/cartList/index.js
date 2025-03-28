import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import {CartListItem} from '../cartListItem'

export const CartList = React.memo(({
  cart = {},
  onRemoveFromCart = () => {}
}) => {

  return (
    <ul>
    {Object.values(cart).map((item) => (
      <li className='Cart-item' key={item.code}>
        <CartListItem item={item} onRemoveFromCart={onRemoveFromCart}/>
      </li>
    ))}
  </ul>
  )
})

CartList.propTypes = {
    cart: PropTypes.objectOf(
      PropTypes.shape({
        code: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ),
    onRemoveFromCart: PropTypes.func,
}
