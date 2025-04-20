import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import Comment from '../comment';
import CommentForm from '../comment-form';
import './style.css';

function CommentsList({
  items = [],
  count = '0',
  articleId,
  onAddComment,
  t = (text) => text,
  isAuthenticated,
  replyTo,
  onReply,
  onCancelReply,
  showMainForm,
  onToggleForm,
  error
}) {
  const cn = bem('CommentsList');

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{t('comment.title')} ({count})</h3>
      {error && <div className={cn('error')}>{error}</div>}
      <div className={cn('container')}>
        {items.map(item => (
          <Comment
            key={item._id}
            comment={item}
            onReply={onReply}
            replyTo={replyTo}
            onCancelReply={onCancelReply}
            onSubmitReply={(text, id, type) => onAddComment(text, id, type)}
            t={t}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
      <div className={cn('new-comment')}>
        {isAuthenticated ? (
          showMainForm ? (
            <CommentForm
              onSubmit={(text) => onAddComment(text, articleId, 'article')}
              t={t}
              placeholder={t('comment.placeholder')}
            />
          ) : (
            <button 
              className={cn('add-comment-btn')} 
              onClick={onToggleForm}
            >
              {t('comment.addComment')}
            </button>
          )
        ) : (
          <div className={cn('auth-message')}>
            <Link to="/login" state={{ back: window.location.pathname }}>
              {t('comment.signIn')}
            </Link> {t('comment.toComment')}
          </div>
        )}
      </div>
    </div>
  );
}

CommentsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  articleId: PropTypes.string.isRequired,
  onAddComment: PropTypes.func.isRequired,
  t: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
  replyTo: PropTypes.string,
  onReply: PropTypes.func.isRequired,
  onCancelReply: PropTypes.func.isRequired,
  showMainForm: PropTypes.bool.isRequired,
  onToggleForm: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default memo(CommentsList);