import React from "react";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {plural} from "../../utils";

function Controls ({ openCart, sum , count}) {

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      {count ? (
        <>
          <div>В корзине: </div>
          <h3>{count} {plural(count, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / {sum} ₽ </h3>
        </>
      ) : ''}
      <button onClick={openCart}>{count ? 'Перейти' : 'Корзина'}</button>
    </div>
  )
}

Controls.propTypes = {
  openCart: PropTypes.func,
  sum: PropTypes.number,
  count: PropTypes.number,
};

export default React.memo(Controls);