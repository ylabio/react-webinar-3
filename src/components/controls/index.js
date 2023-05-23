import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import {plural} from "../../utils";

function Controls(props) {
  const cn = bem('Controls')
  return (
    <div className={cn()}>
      <div className={cn('wrap-text')}>
        <span className={cn('text')}>В корзине:</span>
        {props.basket.length > 0 ? (
          <b>{props.basket.length}{' '}
            {plural(props.basket.length, { one: 'товар', few: 'товара', many: 'товаров' })} /{' '}
            {props.totalPrice.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}</b>
        ) : (
          <b>пусто</b>
        )}
      </div>
      <button onClick={() => props.setActive(!props.active)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  basket: PropTypes.array,
  setActive: PropTypes.func,
  active: PropTypes.bool,
  totalPrice: PropTypes.number,
}

Controls.defaultProps = {
  setActive: () => {},
}

export default React.memo(Controls)
