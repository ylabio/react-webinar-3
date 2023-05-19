import React from 'react';
import './style.css';
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import Head from "../head";

function Modal({closeCart, children}) {
    
    const cn = bem('Modal');
    
    return (
        <div className={cn()}>
            <div className={cn('window')}>
                <div className={cn('head')}>
                    <Head title='Корзина'/>
                    <button className={cn('close')} onClick={closeCart}>
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
