import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Item from '../item';
import cancelIcon from './cancel-icon.svg';
import { price_format } from '../../utils';

function Cart({ list = [], onDeleteCartItem = () => {}, onCloseCart = () => {} }) {
    let totalPrice = 0;
    const cn = bem('Cart');

    return (
        <div className={cn()}>
            <div className={cn('content')}>
                <div className={cn('head')}>
                    <h1>Корзина</h1>
                    <button className="CartBtn-close" onClick={onCloseCart}>
                        <img src={cancelIcon} alt="cancel" />
                    </button>
                </div>
            
                <ul className={cn('list')}>
                    {list.map(item => {
                        if (item.isCart) {
                            totalPrice = totalPrice + item.price * item.count;
                            return (
                                <li key={item.code} className="List-item">
                                    <Item 
                                        item={item} 
                                        isCart={true}
                                        onDelete={onDeleteCartItem}
                                    />
                                </li>
                            )
                        }
                    })}
                </ul>
                <div className={cn('footer')}>
                    <div className="Total-label"><b>Итого:</b></div>
                    <div className="Total-price"><b>{price_format(totalPrice)}</b></div>
                </div>
            </div>
        </div>
    );
};

Cart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        isCart: PropTypes.bool,
        count: PropTypes.number
    })
  ).isRequired,
  onDeleteCartItem: PropTypes.func,
  onCloseCart: PropTypes.func
};

export default React.memo(Cart);