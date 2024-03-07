import React from "react";
import './style.css';

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
