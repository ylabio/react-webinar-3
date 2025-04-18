import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/formatDate';
import './style.css';
import LoginPrompt from '../login-prompt';

function CommentItem({ comment, onReply, isReplying, isAuth, showLoginPrompt }) {
  const cn = bem('Comment');
  const authorName = comment.author?.profile?.name || 'Анонимный пользователь';
  const formattedDate = formatDate(comment.dateCreate);

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <span className={cn('author')}>{authorName}</span>
        <span className={cn('date')}>{formattedDate}</span>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <div className={cn('actions')}>
        <button
          className={cn('reply-btn', { disabled: !isAuth })}
          onClick={() => onReply(comment._id)}
        >
          Ответить
        </button>
      </div>

      {showLoginPrompt && !isAuth && (
        <div className={cn('login-prompt')}>
          <LoginPrompt text="чтобы иметь возможность комментировать" />
        </div>
      )}
    </div>
  );
}

export default memo(CommentItem);
