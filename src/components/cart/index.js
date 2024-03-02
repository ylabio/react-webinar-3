import React from "react";
import PropTypes from 'prop-types';
import {formatPrice} from "../../utils";
import Head from "../head";
import List from "../list";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Cart({cartList, totalPrice, setOpenCart, onDeleteItem}) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('header')}>
          <Head title='Корзина' />
          <div className={cn('actions')}>
            <button onClick={() => setOpenCart(false)}>Закрыть</button>
          </div>
        </div>
        <div className={cn('main')}>
          <div className={cn('list')}>
            {(cartList.length > 0)  
              ? <List list={cartList} onClick={onDeleteItem} textBtn='Удалить' />
              : <h1 className={cn('title')}>В корзине нет товаров</h1>
            }
          </div>
          {cartList.length > 0 &&
            <div className={cn('total')}>
              <div className={cn('total-text')}>Итого</div>
              <div className={cn('total-price')}>{formatPrice(totalPrice)}</div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cartList: PropTypes.array,
  totalPrice: PropTypes.number,
  setOpenCart: PropTypes.func,
  onDeleteItem: PropTypes.func,
};
  
Cart.defaultProps = {
  setOpenCart: () => {},
  onDeleteItem: () => {},
}

export default React.memo(Cart);
