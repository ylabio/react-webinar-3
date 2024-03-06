import React from "react";
import List from '../list';
import PropTypes, {number} from 'prop-types';
import {plural} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ListPage(props) {

  const cn = bem('ListPage');

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
          {props.cartList.length ? '\u00A0/\u00A0' + props.pricesSum + '\u00A0₽' : ''}
        </div>
        <button onClick={props.toggleModal}>Перейти</button>
      </div>
      <List list={props.list}
            cartList={props.cartList}
            onAddItemToCart={props.onAddItemToCart}
            isList={true} isCartList={false}/>
    </div>
  )
}

ListPage.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  pricesSum: PropTypes.string,
  onAddItemToCart: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isList: PropTypes.bool,
  isCartList: PropTypes.bool
};

ListPage.defaultProps = {
  onAddItemToCart: () => {
  },
  onDeleteItem: () => {
  },
}

export default React.memo(ListPage);