import React, { forwardRef } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CommentNonSession = forwardRef(({ url = '/login', level = 0 }, ref) => {
    const marginLeft = level * 40;

    return (
        <div style={{ marginLeft: marginLeft }} className='Comment-non-session' ref={ref}>
            <Link to={url} className='Comment-non-session-link'>Войдите</Link>
            <span>, чтобы иметь возможность комментировать</span>
        </div>
    )
})

CommentNonSession.propTypes = {
    url: PropTypes.string,
    level: PropTypes.number,
    t: PropTypes.func,
}

export default React.memo(CommentNonSession);