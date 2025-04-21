import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Button from '../button';
import { formatDate } from '../../utils/format-date';
import CommentList from '../comment-list';

function Comment({ commentId, username, dateCreate, text, level, onClick, t }) {
    const marginL = level > 8
        ? 7 * 40
        : level * 40;


    return (
        <div style={{ marginLeft: marginL }} className={`Comment`}>
            <div className='Comment-head'>
                <span className='Comment-head-author'>{username}</span>
                <span className='Comment-head-date'>{formatDate(dateCreate, t)}</span>
            </div>
            <div className='Comment-body'>
                <p className='Comment-body-text'>{text}</p>
            </div>
            <Button style={'text'} title={t('comments.reply')} className={'comment-btn'} onClick={() => onClick(commentId)} />
        </div>
    )
}

Comment.propTypes = {
    commentId: PropTypes.string,
    username: PropTypes.string,
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    level: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    handleReplyComment: PropTypes.func,
    t: PropTypes.func,
}

export default React.memo(Comment)

