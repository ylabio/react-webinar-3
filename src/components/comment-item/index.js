import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentItem({
  commentOffset = 0,
  isUserComment = false,
  authorName = '',
  date = '',
  text = '',
  setCommentIdFormVisible = () => {},
  _id = '',
}) {
  const cn = bem('CommentItem');
  return (
    <div className={cn()} style={{ marginLeft: `${commentOffset}px` }}>
      <div className={cn('header')}>
        <span className={cn('author', { userComment: isUserComment })}>{authorName}</span>
        <span className={cn('date')}>{date}</span>
      </div>
      <div className={cn('content')}>{text}</div>
      <span onClick={() => setCommentIdFormVisible(_id)} className={cn('mention')}>
        Ответить
      </span>
    </div>
  );
}
CommentItem.propTypes = {
  setCommentIdFormVisible: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  isUserComment: PropTypes.bool.isRequired,
  commentOffset: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
};

export default memo(CommentItem);
