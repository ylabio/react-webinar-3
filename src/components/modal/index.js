import React from "react";
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './style.css'

const Modal = ({ isShowing, hide , title, }) => {
    isShowing
    ?ReactDom.createPortal(
        <>
            <div className="modal-overlay">
                <div className="modal-wrapper">
                    <div className="modal">
                        <div className="modal-header">
                            <h4>{title}</h4>
                            <button
                            type="button"
                            className="modal-close-button"
                            onClick={hide}
                            >
                            </button>
                        </div>
                        <div className="modal-body">{PropTypes.children}</div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    )
    : null;

    Modal.PropTypes = {
        isShowing: PropTypes.bool.isRequired,
        hide: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };
}
export default Modal;