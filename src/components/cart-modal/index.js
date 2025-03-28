import React from "react";
import PropTypes from 'prop-types';
import Head from "../head";
import List from "../list";
import closeImg from 'close.svg';
import 'style.css';

function CartModal({
    // значения по умолчанию
    cart = {},
    list = [],
    onClose = () => { },
    onDeleteFromCart = () => { },
    totalPrice = 0,
}) {
    // Выбор товаров, которые добавлены в корзину
    const cartItems = list.filter(val => cart[val.code] > 0);

    return (
        <div className="overlay">
            <div className="CartModal">
                <div className="CartModal-head">
                    <Head title="Корзина" />
                    <button onClick={onClose}>
                        <img onClick={onClose} src={closeImg}></img>
                    </button>
                </div>
                <List
                    list={cartItems}
                    onDeleteFromCart={onDeleteFromCart}
                    isInCart={true}
                    cart={cart}
                />
                <div className="CartModal-total">
                    <div className="CartModal-total-item"><b>Итого:</b></div>
                    <div className="CartModal-total-item"><b>{totalPrice} ₽</b></div>
                </div>
            </div>
        </div>
    );
}

CartModal.propTypes = {
    cart: PropTypes.objectOf(PropTypes.number),
    list: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number,
        }),
    ).isRequired,
    onClose: PropTypes.func,
    onDeleteFromCart: PropTypes.func,
    totalPrice: PropTypes.number,
};

export default React.memo(CartModal);