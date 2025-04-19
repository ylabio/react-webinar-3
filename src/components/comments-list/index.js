import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import formatDate from '../../utils/date-format';
import CommentForm from '../comment-form';
import './style.css';

function Comment({ comment, level = 0, onReply, replyTo, onCancelReply, onSubmitReply, t }) {
  const cn = bem('Comment');
  const hasChildren = comment.children && comment.children.length > 0;
  const isReplying = replyTo === comment._id;

  return (
    <div className={cn({ level })}>
      <div className={cn('header')}>
        <span className={cn('author')}>{comment.author?.profile?.name || t('comment.unknownAuthor')}</span>
        <span className={cn('date')}>{formatDate(comment.dateCreate)}</span>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      {!isReplying && (
        <button className={cn('reply')} onClick={() => onReply(comment._id)}>
          {t('comment.reply')}
        </button>
      )}
      {isReplying && (
        <div className={cn('reply-form')}>
          <CommentForm 
            onSubmit={onSubmitReply}
            t={t}
            replyTo={comment._id}
            onCancel={onCancelReply}
          />
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
            />
          ))}
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
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
  }).isRequired,
  level: PropTypes.number,
  onReply: PropTypes.func.isRequired,
  replyTo: PropTypes.string,
  onCancelReply: PropTypes.func.isRequired,
  onSubmitReply: PropTypes.func.isRequired,
  t: PropTypes.func
};

function CommentsList({ items = [], articleId, onAddComment, t = (text) => text }) {
  const cn = bem('CommentsList');
  const [replyTo, setReplyTo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (text) => {
    try {
      setError(null);
      const parentType = replyTo ? 'comment' : 'article';
      const parentId = replyTo || articleId;
      
      await onAddComment(text, parentId, parentType);
      setReplyTo(null);
    } catch (e) {
      setError(t('comment.error'));
      console.error(e);
    }
  };

  const handleCancelReply = () => {
    setReplyTo(null);
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
            onReply={setReplyTo}
            replyTo={replyTo}
            onCancelReply={handleCancelReply}
            onSubmitReply={handleSubmit}
            t={t}
          />
        ))}
      </div>
      {!replyTo && (
        <div className={cn('new-comment')}>
          <CommentForm 
            onSubmit={handleSubmit} 
            t={t}
          />
        </div>
      )}
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