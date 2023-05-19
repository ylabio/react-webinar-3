import React from 'react';
import './style.css';
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import CartItem from "../cart-item";

function Cart({cartItems, onDeleteCartItem,totalPrice }) {
    
    const cn = bem('Cart');
    
    return (
        <div className={cn()}>
            {cartItems.map(item =>
                <div className={cn('item')}  key={item.code}>
                    <CartItem item={item}
                              onDeleteCartItem={onDeleteCartItem}/>
                </div>)}
            <div className={cn('total')}>
                Итого <span>{totalPrice} ₽</span>
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
