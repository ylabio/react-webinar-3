import React from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {RUBLE_CODE} from "../../../constants";
import PropTypes from "prop-types";
import {plural} from "../../../utils";
import Price from "../../price";

function Counter({totalCount, totalPrice}) {
  const cn = bem('Counter');

  const text = (!(totalCount))
    ? "пусто"
    : `${totalCount} ${plural(totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / `

  return (
    <div className={cn()}>
      <span>В корзине: </span>
      <span className={cn('text', {weight: 'bold'})}>{text}</span>
      <span className={cn('text', {weight: 'bold'})}>
        {totalCount ? <Price amount={totalPrice} currency={RUBLE_CODE}/> : ""}
      </span>
    </div>
  )
}

Counter.propTypes = {
  totalCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(Counter);
