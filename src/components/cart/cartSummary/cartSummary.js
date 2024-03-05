import React from 'react';
import formatPrice from '../../../helpers/formatPrice';
import getItemsWord from '../../../helpers/getItemsWord';

const CartSummary = ({ count, totalPrice }) => {
    return (
        <span>
            В корзине: {count > 0 ? (
                <strong className='counting'>{count} {getItemsWord(count)} / {formatPrice(totalPrice)} ₽</strong>
            ) : (
                <strong className='counting'>пусто</strong>
            )}
        </span>
    );
};

export default CartSummary;