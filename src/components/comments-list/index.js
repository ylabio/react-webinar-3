import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/date-format';
import CommentForm from '../comment-form';
import './style.css';
import useSelector from '../../hooks/use-selector';

function Comment({ comment, level = 0, onReply, replyTo, onCancelReply, onSubmitReply, t, isAuthenticated }) {
  const cn = bem('Comment');
  const hasChildren = comment.children && comment.children.length > 0;
  const isReplying = replyTo === comment._id;
  const showAuthMessage = isReplying && !isAuthenticated;

  return (
    <div className={cn({ level })}>
      <div className={cn('header')}>
        <span className={cn('author')}>{comment.author?.profile?.name || t('comment.unknownAuthor')}</span>
        <span className={cn('date')}>{formatDate(comment.dateCreate)}</span>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      
      <button 
        className={cn('reply', { active: isReplying })} 
        onClick={() => onReply(comment._id)}
      >
        {t('comment.reply')}
      </button>

      {isReplying && isAuthenticated && (
        <div className={cn('reply-form')}>
          <CommentForm 
            onSubmit={(text) => onSubmitReply(text, comment._id, 'comment')}
            t={t}
            replyTo={comment._id}
            onCancel={onCancelReply}
          />
        </div>
      )}
      
      {showAuthMessage && (
        <div className={cn('auth-message')}>
          <Link to="/login" state={{ back: window.location.pathname }}>
            {t('comment.signIn')}
          </Link> {t('comment.toComment')}
        </div>
      )}

      {hasChildren && (
        <div className={cn('children')}>
          {comment.children.map(child => (
            <Comment 
              key={child._id} 
              comment={child} 
              level={level + 1} 
              onReply={onReply}
              replyTo={replyTo}
              onCancelReply={onCancelReply}
              onSubmitReply={onSubmitReply}
              t={t}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentsList({ items = [], articleId, onAddComment, t = (text) => text }) {
  const cn = bem('CommentsList');
  const [replyTo, setReplyTo] = useState(null);
  const [error, setError] = useState(null);
  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  const handleSubmitReply = async (text, parentId, parentType) => {
    try {
      setError(null);
      await onAddComment(text, parentId, parentType);
      setReplyTo(null);
    } catch (e) {
      setError(t('comment.error'));
      console.error(e);
    }
  };

  const handleSubmitNewComment = async (text) => {
    try {
      setError(null);
      await onAddComment(text, articleId, 'article');
    } catch (e) {
      setError(t('comment.error'));
      console.error(e);
    }
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const handleReplyClick = (commentId) => {
    if (replyTo === commentId) {
      setReplyTo(null);
    } else {
      setReplyTo(commentId);
    }
  };

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{t('comment.title')} ({items.length})</h3>
      {error && <div className={cn('error')}>{error}</div>}
      <div className={cn('container')}>
        {items.map(item => (
          <Comment 
            key={item._id} 
            comment={item} 
            onReply={handleReplyClick}
            replyTo={replyTo}
            onCancelReply={handleCancelReply}
            onSubmitReply={handleSubmitReply}
            t={t}
            isAuthenticated={select.exists}
          />
        ))}
      </div>
      <div className={cn('new-comment')}>
        {select.exists ? (
          <CommentForm 
            onSubmit={handleSubmitNewComment} 
            t={t}
            placeholder={t('comment.placeholder')}
          />
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      dateCreate: PropTypes.string.isRequired,
      author: PropTypes.shape({
        profile: PropTypes.shape({
          name: PropTypes.string
        })
      }),
      children: PropTypes.array,
      parent: PropTypes.shape({
        _id: PropTypes.string
      })
    })
  ),
  articleId: PropTypes.string.isRequired,
  onAddComment: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default memo(CommentsList);