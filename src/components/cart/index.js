import React from "react"
import PageLayout from "../page-layout"
import PropTypes from "prop-types";
import Head from "../head"
import List from "../list"
import './style.css';
import { numberFormat } from "../../utils";

const Cart = ({ cart, deleteFromCart }) => {
    return (
        <div className="Cart">
            {cart.items.length ? <><List action={deleteFromCart} list={cart.items} type='cart' />
                <div className="Cart-total">
                    <span>Итого</span>
                    <span>{numberFormat(cart.sum)}&nbsp;₽</span>
                </div></> : <div className="Cart-empty">Корзина пуста</div>
            }
        </div>)
}

Cart.propTypes = {
    cart: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            code: PropTypes.number,
            title: PropTypes.string,
            price: PropTypes.number,
            count: PropTypes.number
        })),
        sum: PropTypes.number
    }).isRequired,
    closeModal: PropTypes.func,
    deleteFromCart: PropTypes.func,
};

Cart.defaultProps = {
    deleteFromCart: () => {
    },
    closeModal: () => {
    },
}
export default React.memo(Cart)