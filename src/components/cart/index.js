import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import Head from "../head";
import List from "../list";
import './style.css';

function Cart({list, onToggleCartView, onDeleteCartItem, totalPrice}) {

  const cn = bem('Cart');

  return (
    <div className={cn('overlay')}>
      <div className={cn()}>
          <Head title='Корзина' onToggleCartView={onToggleCartView} isCart={true}/>
          {list.length ? 
            <>
              <List list={list} onDeleteCartItem={onDeleteCartItem} isCart={true}/>
              <div className={cn('total')}>
                <span>Итого</span>
                <span className={cn('price')}>{`${totalPrice.toLocaleString()} ₽`}</span>
              </div>
            </>
            : <p className={cn('empty')}>Корзина пуста.</p>}
      </div>
    </div>
  );
}

Cart.propTypes = {
  list: PropTypes.array,
  onToggleCartView: PropTypes.func,
  onDeleteCartItem: PropTypes.func,
  totalPrice: PropTypes.number
}

Cart.defaultProps = {
  onDeleteCartItem: () => {},
  onAddToCart: () => {},
}

export default React.memo(Cart);
