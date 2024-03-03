import React from "react";
import PropTypes from "prop-types";
import List from "../list";
import Button from "../button/index";
import {formatPrice} from "../../utils";
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Cart({list, onCloseCart, totalPrice, requiredCallback, btnName, isCartOpen, uniqueItemsCount}) {
	const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
				<div className={cn('header')}>
					<h2 className={cn('title')}>Корзина</h2>
					<Button callback={onCloseCart} title={'Закрыть'}/>
				</div>
				<div className={cn('body')}>
					{uniqueItemsCount === 0 && (<div className={cn('empty')}>В корзине пока нет товаров</div>)}
					<List list={list} requiredCallback={requiredCallback} btnName={btnName} isCartOpen={isCartOpen}/>
					<div className={cn('count')}>
						<b>Итого</b>
						<b>{formatPrice(totalPrice)} ₽</b>
					</div>
				</div>
			</div>
    </div>
  )
}

Cart.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
	onCloseCart: PropTypes.func,
	requiredCallback: PropTypes.func,
	totalPrice: PropTypes.number,
	btnName: PropTypes.string.isRequired,
	isCartOpen: PropTypes.bool,
	uniqueItemsCount: PropTypes.number,
};

Cart.defaultProps = {
  onCloseCart: () => {},
  requiredCallback: () => {},
}

export default React.memo(Cart);