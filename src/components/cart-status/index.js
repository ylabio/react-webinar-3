import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {plural, priceFormat} from "../../utils";

function CartStatus({totalCount, totalPrice}) {
  const cn = bem('CartStatus');

  return (
    <div className={cn()}>
      <div>В&nbsp;корзине:</div>
      <div className={cn('data')}>
        {
          totalCount > 0 ? <>{totalCount}&nbsp;{plural(totalCount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })}&nbsp;/&nbsp;{priceFormat(totalPrice)}&nbsp;&#8381;</> : <>пусто</>
        }

      </div>
    </div>
  )
}

CartStatus.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,

};


export default React.memo(CartStatus);
