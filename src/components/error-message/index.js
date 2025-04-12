import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function ErrorMessage({ text }) {
    return (
        <p className='Error-message'>{text}</p>
    )
}

ErrorMessage.propTypes = {
    text: PropTypes.string,
}

export default React.memo(ErrorMessage);