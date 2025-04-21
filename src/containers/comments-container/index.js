import { useCallback, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import { loadComments, createComment, loadCurrentUser } from '../../store-redux/comments/actions';
import Comment from '../../components/comment';
import CommentForm from '../../components/comment-form';
import Spinner from '../../components/spinner';
import AuthGuardForComments from '../auth-guard-for-comments';
import CommentsHeader from '../../components/comments-header';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';

function CommentsContainer() {
  const dispatch = useDispatch();
  const params = useParams();
  const [activeReplyId, setActiveReplyId] = useState(null);
  const { t } = useTranslate();
  const formRef = useRef(null);
  const store = useStore();

  const {
    tree: comments,
    waiting: commentsWaiting,
    creating,
    currentUserId
  } = useSelector(state => state.comments, shallowequal);

  const reduxUser = useSelector(state => state.session?.user);
  const customStoreUser = store.getState().session?.user;
  const currentUser = reduxUser || customStoreUser;

  useEffect(() => {
    dispatch(loadComments(params.id));
    dispatch(loadCurrentUser());
  }, [params.id, dispatch]);

  useEffect(() => {
    if (activeReplyId && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeReplyId]);

  const countTotalComments = (commentsList) => {
    let count = 0;
    const countRecursive = (items) => {
      items.forEach(comment => {
        count++;
        if (comment.children?.length) {
          countRecursive(comment.children);
        }
      });
    };
    countRecursive(commentsList);
    return count;
  };

  const totalComments = countTotalComments(comments);

  const handleSubmitComment = useCallback(async (text, parentId, parentType) => {
    try {
      await dispatch(createComment(
        text,
        parentId || params.id,
        parentType || (parentId ? 'comment' : 'article')
      ));
      setActiveReplyId(null);
    } catch (e) {
      console.error('Error creating comment:', e);
    }
  }, [params.id, dispatch]);

  const renderCommentWithReplies = (comment, depth = 0) => {
    const isReplying = activeReplyId === comment._id;
    const isCurrentUser = currentUserId && comment.author?._id && 
                          currentUserId === comment.author._id;

    return (
      <div key={comment._id}>
        <Comment
          comment={comment}
          onReply={() => setActiveReplyId(comment._id)}
          isReplying={isReplying}
          depth={depth}
          t={t}
          isCurrentUser={isCurrentUser}
        />
        {comment.children?.map(reply => renderCommentWithReplies(reply, depth + 1))}
        {isReplying && (
          <div ref={formRef}>
            <AuthGuardForComments onLoginRedirect={window.location.pathname}>
              <CommentForm
                parentId={comment._id}
                t={t}
                onSubmit={(text) => handleSubmitComment(text, comment._id, 'comment')}
                onCancel={() => setActiveReplyId(null)}
                isSubmitting={creating}
                depth={depth + 1}
              />
            </AuthGuardForComments>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <CommentsHeader count={totalComments} t={t}/>
      <Spinner active={commentsWaiting}>
        {comments.map(comment => renderCommentWithReplies(comment))}
        {!activeReplyId && (
          <AuthGuardForComments onLoginRedirect={window.location.pathname}>
            <CommentForm
              t={t}
              onSubmit={(text) => handleSubmitComment(text, null, 'article')}
              isSubmitting={creating}
              depth={0}
            />
          </AuthGuardForComments>
        )}
      </Spinner>
    </>
  );
}

export default CommentsContainer;
