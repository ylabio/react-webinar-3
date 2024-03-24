import {memo, useCallback, useMemo,useEffect} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import CommentForm from '../../components/comment-form';
import CommentItem from '../../components/comment-item';
import CommentsList from '../../components/comment-list';
import { useDispatch} from 'react-redux';
import { useSelector as useReduxSelector } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import { useState } from 'react';
import shallowEqual from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import buildCommentTree from '../../utils/build-comment-tree';
import IsLogin from '../../utils/comment-or-login';
import CommentAmount from '../../components/comment-amount';
const CommentsContainer = (name) => {
    const store = useStore();
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [activeForm, setActiveForm] = useState('newComment');
    const dispatch = useDispatch();
    const params = useParams();
    const articleId = params.id;
    const select = useReduxSelector((state) => ({
        commentTree: state.comments.commentTree,
        comments: state.comments.comments,
        count: state.comments.count,
        waitingComments: state.comments.loading,
        errorComments: state.comments.error,
    }), shallowEqual);
    useInit(() => {
        dispatch(commentsActions.fetchComments(articleId));
    }, []);
    const { t } = useTranslate(); 
    const profileState = useSelector(state => ({
        name: state.session.user.profile?.name,
    }));
    const handleCancel = useCallback(() => {
        setReplyToCommentId(null);
        setActiveForm('newComment');
    }, []);
    
    const handleReplySubmit = useCallback((commentText, commentId = articleId) => {
        const isArticle = commentId === articleId; 
        const commentData = {
            text: commentText,
            parent: {
                _id: commentId,
                _type: isArticle ? "article" : "comment" 
            },
        };

        dispatch(commentsActions.submitComment(commentData));
        setReplyToCommentId(null);
        setActiveForm('newComment');
    }, [dispatch, articleId]);
    const handleReply = (commentId) => {
        setReplyToCommentId(commentId);
        setActiveForm(`replyTo-${commentId}`);
    };
  
    return (
        <div className='Comments-Container'>
            <CommentAmount title={t('comments.amount')} amount={select.count}></CommentAmount>
            <CommentsList
                comments={select.commentTree}
                activeForm={activeForm}
                replyToCommentId={replyToCommentId}
                onReply={handleReply}
                onReplySubmit={handleReplySubmit}
                onCancel={handleCancel}
                name={profileState.name}
                baseIndent={40}
                title={t('comments.newReply')} 
                sendButton={t('comments.send')} 
                cancelButton={t('comments.cancel')} 
                answer={t('comments.answer')}
                
            />
            
            {replyToCommentId === null ? (
            <IsLogin
                Component={CommentForm}
                componentProps={{
                    key: `new-comment`,
                    onSubmit: (text) => handleReplySubmit(text),
                    title: t('comments.newComment'), 
                    placeholder: t('comments.text'),
                    sendButton: t('comments.send')
                }}
                
            />
            ) : null}
        </div>
    );
    
};


export default memo(CommentsContainer);
