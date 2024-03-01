import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import  Controls  from "../controls";

function Modal({ isOpen, children, onClose }) {
    if (!isOpen) return null;
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose(); 
        }
    };
    return (
        <div className="modal" onClick={handleBackdropClick}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
}


export default React.memo(Modal);
