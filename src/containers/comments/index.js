import React, { useEffect, useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import CommentList from "../../components/comment-list";
import CommentsLayout from "../../components/comments-layout";
import CommentNonSession from "../../components/comment-non-session";
import useSelector from '../../hooks/use-selector';
import CommentForm from "../../components/comment-form";
import { useDispatch, useSelector as useReduxSelector } from "react-redux";
import commentsActions from '../../store-redux/comments/actions';

function Comments({ articleId, commentsList, t }) {
    const { waiting, commentsCount } = useReduxSelector(state => state.comments);

    if (waiting) {
        return <p>{t('comments.loading')}</p>
    }

    const dispatch = useDispatch();
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const commentFormRef = useRef(null);
    const { token } = useSelector(state => state.session);

    const callbacks = {
        onReplyClick: useCallback(id => setReplyToCommentId(id), [setReplyToCommentId]),

        onSubmitComment: useCallback(comment => {
            if (!comment || comment.trim() === '') {
                alert('Комментарий пуст!');
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

    const checkAuth = level => {
        if (!token) {
            return <CommentNonSession level={level} ref={commentFormRef} t={t} />
        }

        return <CommentForm onSubmit={callbacks.onSubmitComment} level={level} ref={commentFormRef} t={t} />
    }

    useEffect(() => {
        if (commentFormRef.current && replyToCommentId) {
            const scrollElem = commentFormRef.current;

            window.scrollTo({
                top: scrollElem.offsetTop + scrollElem.offsetHeight - window.innerHeight + 20,
                behavior: 'smooth'
            });
        }
    }, [commentFormRef.current])

    return (
        <CommentsLayout title={t('comments.title')} commentsCount={commentsCount}>
            <CommentList
                commentsList={commentsList}
                replyToCommentId={replyToCommentId}
                handleReplyComment={callbacks.onReplyClick}
                checkAuth={checkAuth}
                t={t}
            />
        </CommentsLayout>
    )
}

Comments.propTypes = {
    articleId: PropTypes.string,
    commentsList: PropTypes.array,
    t: PropTypes.func,
}

export default React.memo(Comments);