import './style.css';
import React from 'react';
import PropTypes from 'prop-types';

function AuthButton({ title = 'Вход', onClick, }) {
    return (
        <button className="Auth-button" onClick={onClick}>{title}</button>
    )
}

AuthButton.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default React.memo(AuthButton);