import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { plural } from "../../utils";
import { currency } from "../../utils";

const cn = bem('Controls');

function Controls({onShowCart, controls, cartList, itemsCount, sum}) {
  
  const uniqueItemsArr = cartList?.filter((item, index) => cartList.findIndex(e => e.code === item.code) === index)
  const uniqueItemsCount = uniqueItemsArr?.length || 0

  return (
    <div className={cn()}>
      {controls && <span className={cn('cart-text')}>В корзине: </span>}
      {itemsCount > 0 && controls
      ? <span className={cn('value')}>{uniqueItemsCount} {plural(uniqueItemsCount, {one: 'товар', few: 'товара', many: 'товаров'})} / {currency(sum)}</span> 
      : controls
        ? <span className={cn('value')}>пусто</span> 
        : ''}
      {controls && <button className={cn('showCart')} onClick={itemsCount > 0 ? onShowCart : () => alert('Упс, в корзине пока ничего нет')}>Перейти</button>}
    </div>
  )
}

Controls.propTypes = {
  onShowCart: PropTypes.func,
  controls: PropTypes.bool,
  itemsCount: PropTypes.number,
  sum: PropTypes.number,
  cartList: PropTypes.array
};

Controls.defaultProps = {
  onShowCart: () => {}
}

export default React.memo(Controls);
