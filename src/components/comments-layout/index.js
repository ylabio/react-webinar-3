import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function CommentLayout({ commentsCount, children }) {
    return (
        <div className='Comments-layout'>
            <h2 className='Comments-layout-title'>Комментарии ({commentsCount})</h2>
            {children}
        </div>
    )
}

CommentLayout.propTypes = {
    commentsCount: PropTypes.number,
    children: PropTypes.node,
}

export default React.memo(CommentLayout);