import React from "react";
import PropTypes from 'prop-types';
import {formatPrice} from "../../utils";
import List from "../list";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Cart({list, totalPrice, onClick}) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
        {list.length > 0
          ? <div className={cn('content')}>
              <div className={cn('list')}>
                <List list={list} onClick={onClick} textBtn='Удалить' />
              </div>
              <div className={cn('total')}> 
                <div className={cn('total-text')}>Итого</div>
                <div className={cn('total-price')}>{formatPrice(totalPrice)}</div>
              </div>
            </div>
          : <h1 className={cn('title')}>В корзине нет товаров</h1>
        }
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.array,
  totalPrice: PropTypes.number,
  onClick: PropTypes.func,
};
  
Cart.defaultProps = {
  onClick: () => {},
}

export default React.memo(Cart);
