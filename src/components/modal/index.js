import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function Modal({handleClose, show, children, totalPrice}){
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return(
    <div className={showHideClassName}>
        <div className="modal-main">
            {children}
            <div className="Total-price">
                <div className="Price-text">Итого</div>
                <div className="Price">{totalPrice} ₽</div>
            </div>
        </div>
    </div>
    );
}
export default React.memo(Modal);