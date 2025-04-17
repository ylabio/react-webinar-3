import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Comment from '../comment';

function CommentList({ commentsList, replyToCommentId, handleReplyComment, checkAuth }) {

    return (
        <div className='Comments-list'>
            {
                commentsList.map(comment => (
                    <Comment
                        key={comment.id || comment._id}
                        username={comment.author.name}
                        dateCreate={comment.dateCreate}
                        text={comment.text}
                        level={comment.level}
                        children={comment.children}
                        onClick={() => handleReplyComment(comment.id || comment._id)}
                        replyToCommentId={replyToCommentId}
                        checkAuth={checkAuth}
                        commentId={comment.id || comment._id}
                    />
                ))
            }
            {!replyToCommentId && checkAuth()}
        </div>
    )
}

CommentList.propTypes = {
    commentsList: PropTypes.array.isRequired,
    replyToCommentId: PropTypes.string,
    handleReplyComment: PropTypes.func,
    checkAuth: PropTypes.func,
}

export default React.memo(CommentList);