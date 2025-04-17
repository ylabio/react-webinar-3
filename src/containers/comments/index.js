import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import CommentList from "../../components/comment-list";
import CommentsLayout from "../../components/comments-layout";
import CommentNonSession from "../../components/comment-non-session";
import useSelector from '../../hooks/use-selector';
import CommentForm from "../../components/comment-form";
import { useDispatch } from "react-redux";
import commentsActions from '../../store-redux/comments/actions';

function Comments({ articleId, commentsList }) {
    if (commentsList.length === 0) {
        return <p>Загрузка комментариев...</p>
    }

    const dispatch = useDispatch();
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const { token } = useSelector(state => state.session);

    const callbacks = {
        onReplyClick: useCallback(id => setReplyToCommentId(id), [setReplyToCommentId]),

        onSubmitComment: useCallback(comment => {
            if (!comment) {
                console.log('Комментарий пуст!');
                return;
            }

            if (replyToCommentId) {
                dispatch(commentsActions.sendReplyComment(replyToCommentId, comment, token));
                setReplyToCommentId(null);
            } else {
                dispatch(commentsActions.sendArticleComment(articleId, comment, token));
            }

        }, [dispatch, articleId, replyToCommentId]),
    }

    const checkAuth = useCallback(() => {
        if (!token) {
            return <CommentNonSession />
        }

        return <CommentForm onSubmit={callbacks.onSubmitComment} />
    }, [callbacks]);

    return (
        <CommentsLayout commentsCount={commentsList.length}>
            <CommentList
                commentsList={commentsList}
                replyToCommentId={replyToCommentId}
                handleReplyComment={callbacks.onReplyClick}
                checkAuth={checkAuth}
            />
        </CommentsLayout>
    )
}

Comments.propTypes = {
    articleId: PropTypes.string,
    commentsList: PropTypes.array,
}

export default React.memo(Comments);