import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment({ comment, onReply, isReplying, depth = 0, t }) {
  const cn = bem('Comment');

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
    <div className={cn()} style={{ marginLeft: `${depth * 40}px` }}>
      <div className={cn('content')}>
        <div className={`${cn('header')} Comment-Header`}>
          <span className={`${cn('author')} Comment-Author`}>
            {comment.author?.profile?.name}
          </span>
          <span className={`${cn('date')} Comment-Date`}>
            {formatDate(comment.dateCreate)}
          </span>
        </div>
        <div className={`${cn('text')} Comment-Text`}>
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
    replies: PropTypes.array
  }).isRequired,
  onReply: PropTypes.func.isRequired,
  isReplying: PropTypes.bool,
  depth: PropTypes.number,
  t: PropTypes.func.isRequired
};

export default memo(Comment);
