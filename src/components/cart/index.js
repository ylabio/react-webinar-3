import React from "react";
import List from "../list";
import {cn as bem} from '@bem-react/classname';
import {getCost} from "../../utils";
import PropTypes from 'prop-types';
import './style.css';

function Cart(props) {
  
  const cost = getCost(props.cart);

  const cn = bem('Cart');
  
  return (
    <div className={cn()}>
        <div className={cn('body')}>
          <List list={props.cart} buttonTitle='Удалить' onClick={props.onRemove} />
        </div>
        <div className={cn('footer')}>
          <span>Итого</span>
          <span>{cost + ' ₽'}</span>
        </div>
    </div>
  );
}

Cart.PropTypes = {
  cart: PropTypes.array,
  buttonTitle: PropTypes.string,
  onRemove: PropTypes.func,
}

Cart.defaultProps = {
  onRemove: () => {
  },
}

export default React.memo(Cart);
