import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {numberWithSpaces} from "../../utils";


function Modal(props) {

    return (
        <>
        {props.isOpen && 
            <div className="Modal">
                <div className="Modal-wrapper">
                    <div className="Modal-content">
                        <header className="Modal-header">
                            <h3 className="Modal-title">{props.title}</h3>
                            <button className="Modal-button-close" onClick={() => props.modalClose()}>Закрыть</button>
                        </header> 
                        {props.children}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    modalClose: PropTypes.func,
};
  
Modal.defaultProps = {
    modalClose: () => {}
}

export default React.memo(Modal);