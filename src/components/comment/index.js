import { memo} from 'react';
import formatDate from '../../utils/date-format';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import CommentForm from '../comment-form';
import './style.css';

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

export default memo(Comment);