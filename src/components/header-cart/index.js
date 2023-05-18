import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types';
import Cart from "../cart";
import { formatPrice, plural } from "../../utils";
import './style.css';
import Modal from "../modal";

function HeaderCart({cart, onDeleteFromCart}){
  const [isCartOpen, setCartOpen] = useState(false);

  const priceAll = formatPrice(cart.reduce((accum, current) => accum += current.price * current.count, 0)),
    totalView = cart.length ? `${cart.length} ${plural(cart.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${priceAll}` : 'пусто';

  const callbacks = {
    onToggleCart: useCallback(() => {
      setCartOpen(isCartOpen => !isCartOpen);
    }, [isCartOpen])
  }

  return (
    <>
      <div className='HeaderCart'>
        <span>В корзине: <span className="HeaderCart-total">{totalView}</span></span>
        <button className="HeaderCart-button" onClick={callbacks.onToggleCart}>Перейти</button>
      </div>

      {isCartOpen && <Modal><Cart onToggleModal={callbacks.onToggleCart} cart={cart} onDeleteFromCart={onDeleteFromCart} priceAll={priceAll} /></Modal>} 
    </>
  )
}

HeaderCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number
  })).isRequired
};


export default React.memo(HeaderCart);
