import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment({ comment, onReply, isReplying, depth = 0, t, isCurrentUser }) {
  const cn = bem('Comment');
  const MAX_DEPTH = 6;
  const actualDepth = Math.min(depth, MAX_DEPTH);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${t('comments.at')} ${hours}:${minutes}`;
  };

  return (
    <div className={cn()} style={{ marginLeft: `${actualDepth * 40}px`, maxWidth: 'calc(100% - 40px)' }}>
      <div className={cn('content')}>
        <div className={`${cn('header')} Comment-Header`}>
          <span 
            className={`${cn('author')} Comment-Author`}
            style={{ 
              color: isCurrentUser ? '#6B5563' : 'inherit',
            }}
          >
            {comment.author?.profile?.name}
          </span>
          <span className={`${cn('date')} Comment-Date`}>
            {formatDate(comment.dateCreate)}
          </span>
        </div>
        <div className={`${cn('text')} Comment-Text`} style={{ wordBreak: 'break-word' }}>
          {comment.text}
        </div>
        {!isReplying && (
          <button className={`${cn('reply')} Comment-Reply`} onClick={onReply}>
            {t('comments.reply')}
          </button>
        )}
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateCreate: PropTypes.string.isRequired,
    author: PropTypes.object,
    children: PropTypes.array
  }).isRequired,
  onReply: PropTypes.func.isRequired,
  isReplying: PropTypes.bool,
  depth: PropTypes.number,
  t: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool
};

export default memo(Comment);
