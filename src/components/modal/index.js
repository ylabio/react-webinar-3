import React from 'react';
import './style.css';
import PropTypes from "prop-types";
import Head from "../head";

function Modal({ closeCart, children }) {

    return (
        <div className='Modal'>
            <div className='Modal-window'>
                <div className='Modal-head'>
                    <Head title='Корзина' />
                    <button className='Modal-close' onClick={closeCart}>
                        Закрыть
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    head: PropTypes.node,
    children: PropTypes.node,
    closeCart: PropTypes.func.isRequired,
}

export default React.memo(Modal);
