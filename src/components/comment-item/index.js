import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/formatDate';
import './style.css';
import useSelector from '../../hooks/use-selector';

function CommentItem({ comment, onReply, isAuth }) {
  const cn = bem('Comment');
  const authorName = comment.author?.profile?.name || 'Анонимный пользователь';
  const formattedDate = formatDate(comment.dateCreate);
  const currentUser = useSelector(state => state.session.user);
  const isCurrentUser = currentUser?._id === comment.author?._id;
  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <div className={cn('author', { current: isCurrentUser })}>{authorName}</div>
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
    </div>
  );
}

export default memo(CommentItem);
