import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function UserProfileLink({ url, username }) {
    return (
        <div className='user-link'>
            <Link to={url}>{username}</Link>
        </div>
    )
}

UserProfileLink.propTypes = {
    url: PropTypes.string,
    username: PropTypes.string,
}

export default React.memo(UserProfileLink);