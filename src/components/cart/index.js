import React from 'react';
import './style.css';
import PropTypes from "prop-types";
import CartItem from "../cart-item";

function Cart({ cartItems, onDeleteCartItem, totalPrice }) {
    return (
        <div className='Cart'>
            {cartItems.map(item =>
                <div className='Cart-item' key={item.code}>
                    <CartItem item={item}
                        onDeleteCartItem={onDeleteCartItem} />
                </div>)}
            <div className='Cart-total'>
                Итого <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
        </div>
    )
}

Cart.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
    })).isRequired,
    totalPrice: PropTypes.number.isRequired,
    onDeleteCartItem: PropTypes.func,
}

Cart.defaultProps = {
    cartItems: [],
    totalPrice: 0,
    onDeleteCartItem: () => {
    },
}
export default React.memo(Cart);
