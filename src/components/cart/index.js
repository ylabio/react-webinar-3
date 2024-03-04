import React from 'react';
import Head from '../head';
import CartList from '../cart-list';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';

function Cart(props) {

  const cn = bem('Cart');

  const getPricesSum = () => {
    const pricesArray = props.cartList.map(item => item.price*item.addCount);
    return pricesArray.reduce((sum, current) => sum + current, 0)
  }

  return (
    <div className={cn()}>
      <div className={cn('cart-content')}>
        <Head title='Корзина' closeCart={props.toggleCart}></Head>
        <CartList cartList={props.cartList} onDeleteItem={props.onDeleteItem}></CartList>
        <div className={cn('sum')}><span>Итого</span>{getPricesSum()+'\u00A0₽'}</div>
      </div>
      <div className={cn('modal-backdrop hidden')}></div>
    </div>
  )
}

CartList.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  toggleCart: PropTypes.func
};

CartList.defaultProps = {
  onDeleteItem: () => {
  },
  toggleCart: () => {
  }
}

export default React.memo(Cart);