import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import BasketItem from "../basket-item";
import "./style.css";
import List from "../list";


function Basket ({ totalPrice, basketItems, onDeleteItem=() => {} }) {
    const cn = bem('Basket');

    return (
        <div>
            <div className={cn('title')}>Корзина</div>
            <List className={cn('list')}>
                {Array.from(basketItems.values()).map((basketItem) => <BasketItem key={basketItem.item.code} basketItem={basketItem} onDell={onDeleteItem} />)}
            </List>
            <div className='total'>
                <span>Итого:</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
            </div>
        </div>
    );
}

Basket.propTypes = {
    basketItems: PropTypes.instanceOf(Map),
    onDeleteItem: PropTypes.func,
  };

export default React.memo(Basket);