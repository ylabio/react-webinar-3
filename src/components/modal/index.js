import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {numberWithSpaces} from "../../utils";
import Product from "../product";

function Modal(props) {

    const cartPrice = props.cart.reduce((acc, item) => acc + item.price * item.amount, 0);

    return (
        <>
        {props.isOpen && 
            <div className="Modal">
                <div className="Modal-wrapper">
                    <div className="Modal-content">
                        <header className="Modal-header">
                            <h3 className="Modal-title">Корзина</h3>
                            <button className="Modal-button-close" onClick={() => props.modalClose()}>Закрыть</button>
                        </header> 
                        <div className="Modal-main">
                            {props.cart.length === 0 && <div className="Modal-desc"><b>Корзина пуста</b></div>}
                            {props.cart.map(item => 
                                <Product key={item.code} item={item} onDelete={props.onDeleteCart} />
                            )}
                        </div>
                        {props.cart.length > 0 && 
                            <footer className="Modal-footer">
                                <div className="Modal-total">
                                    <b>Итого</b>
                                </div>
                                <div className="Modal-price">
                                    <b>{numberWithSpaces(cartPrice)} ₽</b>
                                </div>
                            </footer>
                        }
                    </div>
                </div>
            </div>
        }
        </>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    modalClose: PropTypes.func,
    onDeleteCart: PropTypes.func,
    cart: PropTypes.arrayOf(PropTypes.object).isRequired
};
  
Modal.defaultProps = {
    modalClose: () => {},
    onDeleteCart: () => {}
}

export default React.memo(Modal);