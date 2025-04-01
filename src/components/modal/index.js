import React from "react";
import './style.css';

const Modal = ({ isOpen = false, onClose = () => { }, children = null }) => {
    if (!isOpen) return null;
    return (
        <div className="Modal-overlay" onClick={onClose}>
            <div className="Modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="Modal-close" onClick={onClose}></div>
                {children}
            </div>
        </div>
    );
};

export default Modal;