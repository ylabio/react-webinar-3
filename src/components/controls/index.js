import React from "react";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {formatPrice, plural} from "../../utils";

function Controls ({ openCart, sum , count}) {

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('title')}>В корзине: </div>
      {count ? (
          <h3 className={cn('sum')}>{count} {plural(count, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / {formatPrice(sum)} ₽ </h3>
      ) : (
        <h3 className={cn('sum')}>пусто</h3>
      )}
      <button onClick={openCart} className={cn('btn')}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openCart: PropTypes.func,
  sum: PropTypes.number,
  count: PropTypes.number,
};

export default React.memo(Controls);