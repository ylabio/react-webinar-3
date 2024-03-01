import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import  Controls  from "../controls";

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <Controls onAction={onClose} title='Закрыть' />
                {children}
            </div>
        </div>
    );
}


export default React.memo(Modal);
