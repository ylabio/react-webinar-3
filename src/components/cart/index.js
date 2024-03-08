import React from "react";
import {cn as bem} from '@bem-react/classname';
import {formatNum} from "../../utils";
import './style.css';
import List from "../list/index";

function Cart({list, callbacks, buttonTitle, totalSumm}){
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('list')}>
       <div className={cn('emptyRow')}></div>
        <List type={'Cart'} list={list}
            callback={callbacks.onRemoveFromCart}
            buttonTitle={buttonTitle}
        />
      </div>
      <div className={cn('totalSumm')}>
        <div>
          <p>Итого</p>
        </div>
      <div>{`${formatNum(totalSumm)} ₽`}</div>
    </div>
    </div>
  )
}

export default Cart;