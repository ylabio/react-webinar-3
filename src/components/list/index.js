import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import {plural} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List(props) {

  const cn = bem('List');

  const getPricesSum = () => {
    const pricesArray = props.cartList.map(item => item.price*item.addCount);
    return pricesArray.reduce((sum, current) => sum + current, 0);
  }

  return (
    <div className={cn()}>
      <div className={cn('cart-info')}>
        В корзине:
        <div className={cn('cart-empty')}>{props.cartList.length ? '' : '\u00A0пусто'}</div>
        <div className={cn('cart-data')}>
            <div>{props.cartList.length ? `${props.cartList.length} ${plural(props.cartList.length, {
              one: 'товар',
              few: 'товара',
              many: 'товаров'
            })}` : ''}
            </div>
            {props.cartList.length ? '\u00A0/\u00A0' + getPricesSum() + '\u00A0₽' : ''}
          </div>
        <button onClick={props.toggleCart}>Перейти</button>
      </div>
      {props.list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} inList={true} inCartList={false} onAdd={props.onAddItemToCart}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItemToCart: PropTypes.func,
  toggleCart: PropTypes.func
};

List.defaultProps = {
  onAddItemToCart: () => {
  },
}

export default React.memo(List);
