import React from "react";
import PropTypes from "prop-types";
import List from "../list";
import {formatPrice} from "../../utils";
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Cart({list, totalPrice, requiredCallback}) {
	const cn = bem('Cart');

  return (
    <div className={cn('body')}>
      {list.length === 0 && (<div className={cn('empty')}>В корзине пока нет товаров</div>)}
					<List list={list} requiredCallback={requiredCallback} btnName={'Удалить'}/>
					<div className={cn('count')}>
						<b>Итого</b>
						<b>{formatPrice(totalPrice)} ₽</b>
					</div>
    </div>
  )
}

Cart.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
	requiredCallback: PropTypes.func,
	totalPrice: PropTypes.number,
};

Cart.defaultProps = {
  requiredCallback: () => {},
}

export default React.memo(Cart);