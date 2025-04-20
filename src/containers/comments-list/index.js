import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentsList from '../../components/comments-list';
import commentsActions from '../../store-redux/comments/actions';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function CommentsListContainer({ articleId }) {
  const { t } = useTranslate();
  const { items, count } = useSelector(state => state.comments);
  const dispatch = useDispatch();
  const { exists } = useStore().getState().session;

  const [replyTo, setReplyTo] = useState(null);
  const [showMainForm, setShowMainForm] = useState(true);
  const [error, setError] = useState(null);

  const handleReply = (commentId) => {
    if (!exists) {
      setReplyTo(commentId);
      setShowMainForm(false);
      return;
    }
    setReplyTo(replyTo === commentId ? null : commentId);
    setShowMainForm(replyTo === commentId);
  };

  const handleAddComment = async (text, parentId, parentType) => {
    try {
      setError(null);
      await dispatch(commentsActions.addComment(text, parentId, parentType));
      setReplyTo(null);
      if (parentType === 'article') {
        setShowMainForm(false);
      }
    } catch (e) {
      setError(t('comment.error'));
    }
  };

  return (
    <CommentsList
      items={items}
      count={count}
      articleId={articleId}
      onAddComment={handleAddComment}
      t={t}
      isAuthenticated={exists}
      replyTo={replyTo}
      onReply={handleReply}
      onCancelReply={() => setReplyTo(null)}
      showMainForm={showMainForm}
      onToggleForm={() => {
        setShowMainForm(!showMainForm);
        setReplyTo(null);
      }}
      error={error}
    />
  );
}

export default memo(CommentsListContainer);