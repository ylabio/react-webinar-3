import React, {useCallback, useState, useContext} from "react";
import PropTypes from 'prop-types';
import List from '../list';
import CartItem from '../cart-item';
import { formatSum } from "../../utils";
import { StoreContext } from "../../store";
import './style.css';

function Cart() {

  const [ storeContext, setStoreContext ] = useContext(StoreContext);
  const { cart } = storeContext.getState();
  
  const onDeleteItem = useCallback((code) => {
    storeContext.removeFromCart(code);
  }, [storeContext.removeFromCart])
  
  return (
    <div className='Cart'>
        <List 
          list={cart.items} 
          onClick={onDeleteItem}
          showAmount={true}
        />
        <div className='Cart-total'>
          <div>
            Итого
          </div>
          <div>
            {formatSum(cart.total, { style: 'currency', currency: 'RUB' })}
          </div>
        </div>
    </div>
  )
}

export default React.memo(Cart);