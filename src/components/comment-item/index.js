import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';

import './style.css';
import PropTypes from 'prop-types';

function CommentItem({ comment, onReply, children, buttonText }) {
  const cn = bem('CommentItem');

  return (
    <div className={cn('')} style={{ '--level': comment.level }}>
      <div className={cn('info')}>
        <span className={cn('author')}>{comment.authorName}</span>
        <span className={cn('date')}>{comment.dateCreate}</span>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <button className={cn('button')} onClick={() => onReply(comment._id)}>
        {buttonText}
      </button>
      {children}
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  onReply: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default memo(CommentItem);
