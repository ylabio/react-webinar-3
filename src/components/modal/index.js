import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({ active, setModalActive, children }) {

    return (
        <div className={`Modal` + (active ? ' active' : '')}>
            <div className='Modal-content'>
                <button className='Modal-btn-close' onClick={() => setModalActive(false)}>Закрыть</button>
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    active: PropTypes.bool,
    cart: PropTypes.array,
    setModalActive: PropTypes.func,
    onDeleteItem: PropTypes.func,
    children: PropTypes.node
}

Modal.defaultProps = {
    setModalActive: () => { },
    onDeleteItem: () => { }
}

export default Modal;