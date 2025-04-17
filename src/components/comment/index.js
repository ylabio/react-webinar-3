import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Button from '../button';
import { formatDate } from '../../utils/format-date';
import CommentList from '../comment-list';

function Comment({ commentId, username, dateCreate, text, level, replyToCommentId, onClick, checkAuth, children }) {
    const marginLeft = level * 40;

    return (
        <div style={{ marginLeft: marginLeft }} className={`Comment`}>
            <div className='Comment-head'>
                <span className='Comment-head-author'>{username}</span>
                <span className='Comment-head-date'>{formatDate(dateCreate)}</span>
            </div>
            <div className='Comment-body'>
                <p className='Comment-body-text'>{text}</p>
            </div>
            <Button style={'text'} title={'Ответить'} className={'comment-btn'} onClick={() => onClick(commentId)} />

            {children.length > 0 && children.map(comment => (
                <Comment
                    key={comment.id || comment._id}
                    username={comment.author.name}
                    dateCreate={comment.dateCreate}
                    text={comment.text}
                    level={level + 1}
                    children={comment.children}
                    onClick={() => onClick(comment.id || comment._id)}
                    replyToCommentId={replyToCommentId}
                    checkAuth={checkAuth}
                    commentId={comment.id || comment._id}
                />
            ))}
            {replyToCommentId === commentId && checkAuth()}
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
    replyToCommentId: PropTypes.string,
    handleReplyComment: PropTypes.func,
    checkAuth: PropTypes.func,
    children: PropTypes.array,
}

export default React.memo(Comment)

