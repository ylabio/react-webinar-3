import React from 'react';
import './style.css'
import PropTypes from 'prop-types';
import { ItemButton } from '../itemButton';

export const CartListItem = React.memo(({
  onRemoveFromCart = () => {},
  item = {}
}) => {

  return (
      <>
        <div className='Cart-item-bold'>{item.title}</div>
          <div className='Cart-item-normal'>
            <div>{item.quantity} шт</div>
            <div className='Cart-item-price'>{item.price} ₽</div>
            <ItemButton
              textButton='Удалить'
              onClick={()=>onRemoveFromCart(item.code)}
            />
        </div>
      </>
  )
})

CartListItem.propTypes = {
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
