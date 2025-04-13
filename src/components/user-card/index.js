import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function UserCard({ name = '', phone = '', email = '' }) {
    return (
        <div className='Profile'>
            <h2 className='Profile-title'>Профиль</h2>
            <ul className='Profile-info'>
                <li className='Profile-name Profile-item'>
                    <span className='Profile-item-title'>Имя: </span> <span><b>{name}</b></span>
                </li>

                <li className='Profile-phone Profile-item'>
                    <span className='Profile-item-title'>Телефон: </span> <span><b>{phone}</b></span>
                </li>

                <li className='Profile-email Profile-item'>
                    <span className='Profile-item-title'>Почта: </span> <span><b>{email}</b></span>
                </li>
            </ul>
        </div>
    )
}

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}

export default React.memo(UserCard);