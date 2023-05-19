import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Head from "../head";
import List from "../list";
import {priceFormat} from "../../utils";

function Cart({list, onDeleteFromCart, onCloseButtonClick, totalPrice}) {
  const cn = bem('Cart');

  return (
    <div className={cn()} onClick={e => e.stopPropagation()}>
      <Head title={'Корзина'} onCloseButtonClick={onCloseButtonClick}/>
      <div className={cn('list-wrap')}>
        <List list={list} itemButtonCaption={'Удалить'} onItemButtonClick={onDeleteFromCart}/>
      </div>
      <div className={cn('total-price')}>{
        totalPrice
          ? <span>Итого {priceFormat(totalPrice)}&nbsp;&#8381;</span>
          : <span>Корзина покупок пуста</span>
      }</div>
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteFromCart: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  totalPrice: PropTypes.number
};

export default Cart;



