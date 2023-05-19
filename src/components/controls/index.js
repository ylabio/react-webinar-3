import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
const plural = require('plural-ru');

function Controls(props) {
  const cn = bem('Controls')
  return (
    <div className={cn()}>
      <div className={cn('wrap-text')}>
        <span className={cn('text')}>В корзине:</span>
        {props.totalQuantity > 0 ? (
          <b>{props.totalQuantity}{' '}
            {plural(props.totalQuantity, 'товар', 'товара', 'товаров')} /{' '}
            {props.totalPrice} ₽</b>
        ) : (
          <b>пусто</b>
        )}
      </div>
      <button onClick={() => props.setActive(!props.active)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setActive: PropTypes.func,
  active: PropTypes.bool,
  totalQuantity: PropTypes.number,
  totalPrice: PropTypes.number,
}

Controls.defaultProps = {
  setActive: () => {},
}

export default React.memo(Controls)
