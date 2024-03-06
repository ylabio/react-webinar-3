import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function Modal(props){
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    return(
    <div className={showHideClassName}>
        <div className="modal-main">
            {props.children}
        </div>
    </div>
    );
}

Modal.PropTypes = {
    children: PropTypes.node,
    show: PropTypes.bool
}

export default React.memo(Modal);