import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CommentNonSession({ url = '/login' }) {
    return (
        <div className='Comment-non-session'>
            <Link to={url} className='Comment-non-session-link'>Войдите</Link>
            <span>, чтобы иметь возможность комментировать</span>
        </div>
    )
}

CommentNonSession.propTypes = {
    url: PropTypes.string,
}

export default React.memo(CommentNonSession);