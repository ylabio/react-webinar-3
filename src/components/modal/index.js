import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal({ children }) {

    return (
        <div className='Modal'>
            {children}
        </div>
    )
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
    children: null
}

export default React.memo(Modal);