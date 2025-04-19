import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import formatDate from '../../utils/date-format';
import './style.css';

function Comment({ comment, level = 0 }) {
  const cn = bem('Comment');
  const hasChildren = comment.children && comment.children.length > 0;

  return (
    <div className={cn({ level })}>
      <div className={cn('header')}>
        <span className={cn('author')}>{comment.author?.profile?.name || 'Неизвестный автор'}</span>
        <span className={cn('date')}>{formatDate(comment.dateCreate)}</span>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      {hasChildren && (
        <div className={cn('children')}>
          {comment.children.map(child => (
            <Comment key={child._id} comment={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    children: PropTypes.array,
  }),
  level: PropTypes.number,
};

function CommentsList({ items = '' }) {
  const cn = bem('CommentsList');

  if (items.length === 0) {
    return <div className={cn()}>Нет комментариев</div>;
  }

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>Комментарии ({items.length})</h3>
      <div className={cn('container')}>
        {items.map(item => (
          <Comment key={item._id} comment={item} />
        ))}
      </div>
    </div>
  );
}

CommentsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      text: PropTypes.string,
      dateCreate: PropTypes.string,
      author: PropTypes.shape({
        profile: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
      children: PropTypes.array,
    }),
  ),
};

export default memo(CommentsList);