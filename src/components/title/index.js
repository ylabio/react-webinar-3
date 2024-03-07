import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Title({ children, onClose }) {
    
    return (
        <div className='Title'>
            <b>{children}</b>
            <button className="Title-button" onClick={onClose}>Закрыть</button>
        </div>
    )
}

Title.propTypes = {
    children: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

Title.defaultProps = {
    children: null,
    onClose: () => {}
}

export default React.memo(Title);