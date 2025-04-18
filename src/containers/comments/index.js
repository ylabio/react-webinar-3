import { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useInit from '../../hooks/use-init';
import commentActions from '../../store-redux/comments/actions';
import CommentList from '../../components/comment-list';
import CommentForm from '../../components/comment-form';
import useStore from '../../hooks/use-store';
import Spinner from '../../components/spinner';

function CommentsBlock() {
  const { id: articleId } = useParams();
  const dispatch = useDispatch();
  const store = useStore();

  const { items: comments, waiting } = useSelector(state => state.comments);
  const [isAuth, setIsAuth] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [showLoginForComment, setShowLoginForComment] = useState(null);

  useEffect(() => {
    const updateAuthStatus = () => {
      setIsAuth(store.getState().session?.exists || false);
    };
    updateAuthStatus();
    const unsubscribe = store.subscribe(updateAuthStatus);
    return () => unsubscribe();
  }, [store]);

  useInit(() => {
    dispatch(commentActions.load(articleId));
  }, [articleId]);

  const handleSubmit = async (text, parentId, parentType) => {
    const success = await dispatch(commentActions.add(text, parentId, parentType));
    if (success) {
      setReplyTo(null);
      dispatch(commentActions.load(articleId));
    }
  };

  const handleReplyClick = commentId => {
    if (isAuth) {
      setReplyTo(commentId);
      setShowLoginForComment(null);
    } else {
      setShowLoginForComment(commentId);
      setReplyTo(null);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      setReplyTo(null);
      setShowLoginForComment(null);
    }
  }, [isAuth]);

  return (
    <Spinner active={waiting}>
      <CommentList
        comments={comments}
        onReply={handleReplyClick}
        replyTo={replyTo}
        isAuth={isAuth}
        onSubmit={handleSubmit}
        articleId={articleId}
        showLoginForComment={showLoginForComment}
      />

      {isAuth && !replyTo && (
        <CommentForm
          onSubmit={text => handleSubmit(text, articleId, 'article')}
          title="Новый комментарий"
          placeholder="Ваш комментарий..."
        />
      )}
    </Spinner>
  );
}

export default memo(CommentsBlock);
