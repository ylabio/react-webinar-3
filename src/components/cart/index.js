import React from "react";
import {cn as bem} from '@bem-react/classname';
import {formatNum} from "../../utils";
import './style.css';
import Head from "../head/index";
import Button from "../button/index"
import List from "../list/index";

function Cart({list, callbacks, buttonTitle, totalSumm}){
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('titleRow')}>
        <Head title='Корзина'/>
        <Button callback={callbacks.onCloseCart}  title={'Закрыть'}/>
      </div>
      <div className={cn('emptyRow')}></div>
      <List type={'Cart'} list={list}
            callback={callbacks.onRemoveFromCart}
            buttonTitle={buttonTitle}
            />
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