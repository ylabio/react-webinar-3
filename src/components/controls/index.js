import React, { useCallback, useContext } from "react";
import PropTypes from 'prop-types';
import { plural, formatSum } from "../../utils";
import { StoreContext } from "../../store";
import './style.css';

function Controls() {
  
  const [ storeContext, setStoreContext ] = useContext(StoreContext);
  const { cart } = storeContext.getState();

  const onOpenCart = useCallback(() => {
    storeContext.setCartVisibility(true);
  }, [storeContext.setCartVisibility]);

  return (
    <div className='Controls'>
      <div className='Controls-cart-info'>
        <div className='Controls-cart-info-title'>
          В корзине:
        </div>
        {
          cart.amount ?
            <div className='Controls-cart-info-total'>
              {`${cart.amount} ${plural(cart.amount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatSum(cart.total, { style: 'currency', currency: 'RUB' })}`}
            </div>
          :
            <div className='Controls-cart-info-total'>
              пусто
            </div>
        }
      </div>
      <button className='Controls-button' onClick={onOpenCart}>Перейти</button>
    </div>
  )
}

export default React.memo(Controls);
