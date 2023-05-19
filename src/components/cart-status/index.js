import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {plural, priceFormat} from "../../utils";

function CartStatus({totalCount, totalPrice}) {
  const cn = bem('CartStatus');

  return (
    <div className={cn()}>
      <div>В корзине:&nbsp;&nbsp;
        <span className={cn('data')}>{
          totalCount > 0 ? <>{totalCount}&nbsp;{plural(totalCount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })}&nbsp;/&nbsp;{priceFormat(totalPrice)}&nbsp;&#8381;</> : <>пусто</>
        }</span>
      </div>
    </div>
  )
}

CartStatus.propTypes = {
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number,

};


export default CartStatus;
