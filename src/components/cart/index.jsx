import React from "react";
import PropTypes from 'prop-types';
import Head from "../head/index.jsx";
import List from "../list/index.jsx";
import "./style.css";

function Cart({ cart, onRemoveItem, onClose, sum, count }) {
    return (
        <div className="Cart">
            <div className="Cart-Header">
                <Head title="Корзина" />
                <button onClick={onClose}>Закрыть</button>
            </div>
            <List list={cart} onClick={onRemoveItem} buttonText="Удалить" count={count} />
            <div className="Cart-Total">
                <div className="Total-Text">Итого</div>
                <div className="Total-Sum">{`${sum} ₽`}</div>
            </div>
        </div>
    )
}

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onRemoveItem: PropTypes.func,
    onClose: PropTypes.func,
    sum: PropTypes.string,
    count: PropTypes.number
}

Cart.defaultProps = {
    onRemoveItem: () => { },
    onClose: () => { }
}

export default Cart;