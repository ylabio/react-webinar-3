import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import BasketItem from "../basket-item";
import "./style.css";


function Basket ({ basketItems, onDeleteItem=() => {} }) {
    const itemsList = [];
    let sum = 0;
    const cn = bem('Basket');

    basketItems.forEach((basketItem) => {
        sum += basketItem.item.price * basketItem.count;
        itemsList.push(<BasketItem basketItem={basketItem} onDell={onDeleteItem} />);
    })

    return (
        <div>
            <div className={cn('title')}>Корзина</div>
            <ul className={cn('list')}>
                {itemsList.map((item) => {
                    return (
                        <li key={item.props.basketItem.item.code} className={cn('list-item')}>
                            {item}
                        </li>
                    )
                })}
            </ul>
            <div className='total'>
                <span>Итого:</span>
                <span>{sum.toLocaleString()} ₽</span>
            </div>
        </div>
    );
}

Basket.propTypes = {
    basketItems: PropTypes.instanceOf(Map),
    onDeleteItem: PropTypes.func,
  };

export default React.memo(Basket);