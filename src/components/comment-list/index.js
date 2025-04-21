import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Comment from '../comment';

function CommentList({ commentsList, replyToCommentId, handleReplyComment, checkAuth, t }) {

    const renderComments = (comments, level = 0) => {
        return comments.map((comment) => (
            <React.Fragment key={comment.id || comment._id}>
                <Comment
                    commentId={comment.id || comment._id}
                    username={comment.author.profile.name}
                    dateCreate={comment.dateCreate}
                    text={comment.text}
                    level={level}
                    onClick={handleReplyComment}
                    replyToCommentId={replyToCommentId}
                    checkAuth={checkAuth}
                    t={t}
                />
                {comment.children && comment.children.length > 0 && renderComments(comment.children, level + 1)}
                {replyToCommentId === comment.id || replyToCommentId === comment._id && checkAuth(level)}
            </React.Fragment>
        ));
    };

    return (
        <div className='Comments-list'>
            {renderComments(commentsList)}
            {!replyToCommentId && checkAuth()}
        </div>
    )
}

CommentList.propTypes = {
    commentsList: PropTypes.array.isRequired,
    replyToCommentId: PropTypes.string,
    handleReplyComment: PropTypes.func,
    checkAuth: PropTypes.func,
    t: PropTypes.func,
}

export default React.memo(CommentList);