import { memo, useMemo, useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Comment = forwardRef(function Comment({ 
  comment, 
  replyForm,
  onOpenReply,
  t
}, ref) {

  const cn = bem('Comment');

  const getOffsetClass = (offset) => {
    return cn(`offset-${Math.min(offset - 1, 3)}`);
  }

  const postDate = useMemo(() => {
    const options = {
      dateStyle: "long",
      timeStyle: "short",
    }
    return new Intl.DateTimeFormat(undefined, options).format(comment.dateCreated);
  }, [comment.dateCreate]);

  const callbacks = {
    onOpenReply: (e) => {
      e.preventDefault();
      onOpenReply(comment._id);
    }
  }

  return comment && (
    <div ref={ref} className={`${cn()} ${getOffsetClass(comment.offset)}`}>
      <div className={cn('heading')}>
        <span className={cn('username')}>{comment.author?.profile.name}</span>
        <span className={cn('date')}>
          {postDate}
        </span>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <button 
        onClick={callbacks.onOpenReply} 
        className={cn('reply-button')}
      >
        {t.translate("comments.replyButton")}
      </button>
      {comment.replyOpen && replyForm}
    </div>    
  );
});

Comment.propTypes = {

};

Comment.defaultProps = {

}

export default Comment;
