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
      <div className={cn('head-wrap')}>
        <Head title={'Корзина'} onCloseButtonClick={onCloseButtonClick}/>
      </div>
      <div className={cn('list-wrap')}>
        <List list={list} itemButtonCaption={'Удалить'} onItemButtonClick={onDeleteFromCart}/>
      </div>
      <div className={cn('total-price')}>{
        list.length === 0
          ? <div>Корзина покупок пуста</div> :
          <div className={cn('total-price-str')}>
            <div>Итого</div>
            <div>{priceFormat(totalPrice)}&nbsp;&#8381;</div>
          </div>
      }</div>
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(Cart);



