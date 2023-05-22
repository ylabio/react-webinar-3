import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {numberFormat, plural} from "../../utils";
import {store} from "../../index";

function Controls({cartList, setCartState}){

  const cartPrice = store.state.cartPrice
  const cartCount = cartList.length

  return (
    <div className='Controls'>
      <span>В корзине:</span>
      <b>
        {
          cartCount ?
            <>
              {cartCount} {plural(cartCount, {one: 'товар', few: 'товара', many: 'товаров'})}
              {' / '}
              {numberFormat(cartPrice)} ₽
            </>
          : 'пусто'
        }


      </b>
      <button onClick={() => setCartState(true)}>
        Перейти
      </button>
    </div>
  )
}

Controls.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.object),
  setCartState: PropTypes.func
};

Controls.defaultProps = {
  cartList: [],
  setCartState: () => {}
}

export default React.memo(Controls);
