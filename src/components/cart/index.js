import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

// Компоненты
import CartIcon from '../cart-icon';

// Функции
import { formatGoodsWord } from '../../utils';

function Cart({ cart = [], cartLength, totalPrice, setIsOpen }) {
    let formatText = 'товар';

    if (cart.length > 0) {
        formatText = formatGoodsWord(cartLength);
    }

    if (cart.length === 0) {
        return (
            <button className='Cart' onClick={() => setIsOpen(true)}>
                <CartIcon /> Пусто
            </button>
        )
    }

    return (
        <button className='Cart' onClick={() => setIsOpen(true)}>
            <CartIcon /> {cartLength} {formatText} / {totalPrice.toLocaleString('ru-RU')} ₽
        </button>
    )
}

Cart.propTypes = {
    cart: PropTypes.array,
    cartLength: PropTypes.number,
    totalPrice: PropTypes.number,
    setIsOpen: PropTypes.func,
};

export default React.memo(Cart);