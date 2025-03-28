import React from 'react';
import BasketItem from '../basket-item/index.js';
import './style.css';
import Cross from '../../assets/icons/cross.svg';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function Modal ({ basketItems, onDeleteItem=() => {}, hideModal=() => {} }) {
    const itemsList = [];
    let sum = 0;
    const cn = bem('Modal');

    basketItems.forEach((basketItem) => {
        sum += basketItem.item.price * basketItem.count;
        itemsList.push(<BasketItem basketItem={basketItem} onDell={onDeleteItem} />);
    })

    return(
        <div className={cn('container')} >
            <div className={cn()}>
                <div className='cross' onClick={() => { hideModal() }}>
                    <Cross />
                </div>
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
                    <span>{sum} ₽</span>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    basketItems: PropTypes.instanceOf(Map),
    onDeleteItem: PropTypes.func,
    hideModal: PropTypes.func
  };

export default React.memo(Modal);