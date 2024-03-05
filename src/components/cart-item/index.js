
import React from "react";
// import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';



function CartItem( props ) {

    const callbacks = {
        onDelete: () => {
            props.onDelete(props.item.code)
        }
    }

    return (
        <div className='CartItem' >
          <div className='CartItem-code'>{props.item.code}</div>
          <div className='CartItem-title'>{props.item.title}</div>
          <div className='CartItem-info'>
            <div className='CartItem-price'>{props.item.price} ₽</div>
            <div className='CartItem-count'>{props.item.count} шт</div>
            <Button onClick={callbacks.onDelete} title={'Удалить'} />
          </div>
        </div>
      );
}

export default CartItem;