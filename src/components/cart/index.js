import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';
import Head from "../head";
import List from "../list";
import { priceFormatting } from "../../utils";


function Cart({orders, totalSumCart, onDeleteItem, setActive}){

  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <Head title='Корзина'>           
        <div className={cn('close')}>
          <button onClick={() => setActive(false)}>Закрыть</button> 
        </div>  
      </Head>      
      <div className={cn('list')}>
        {orders.length ? <List orders={orders} onDeleteItem={onDeleteItem} /> : <div className={cn('empty')}>Корзина пуста</div>}
      </div>      
      <div className={cn('total')}>
        <strong>{orders.length ? (<div><span>Итого</span> {priceFormatting(totalSumCart)} </div>) : ''}</strong>
      </div>
    </div>
  )
}

Cart.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  totalSumCart: PropTypes.number,
  onDeleteItem: PropTypes.func,
  setActive: PropTypes.func
};

Cart.defaultProps = {
  onDeleteItem: () => {}, 
  setActive: () => {}
}

export default React.memo(Cart);
