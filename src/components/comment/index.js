import { memo, useMemo, useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Comment = forwardRef(function Comment({
  comment, 
  onOpenReply,
  own,
  t,
  locale,
}, ref) {

  const cn = bem('Comment');

  const getOffsetClass = (offset) => {
    return cn(`offset-${Math.min(Math.max(offset - 1, 0), 3)}`);
  };

  const postDate = useMemo(() => {
    const options = {
      dateStyle: "long",
      timeStyle: "short",
    }
    return new Intl.DateTimeFormat(locale, options).format(comment.dateCreated);
  }, [locale]);

  const callbacks = {
    onOpenReply: (e) => {
      e.preventDefault();
      onOpenReply(comment._id);
    },
  };

  return comment && (
    <li className={`${cn()} ${getOffsetClass(comment.offset)}`}>
      <div ref={ref} className={cn('body')}>
        <div className={cn('heading')}>
          <span className={own ? cn('username-own') : cn('username')}>
            {comment.author?.profile.name}
          </span>
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
      </div>
    </li>
  );
});

Comment.propTypes = {

};

Comment.defaultProps = {

};

export default Comment;
