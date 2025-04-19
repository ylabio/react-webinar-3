import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';

import CommentNew from '../comment-new';
import CommentLogin from '../comment-login';
import formatDate from '../../../utils/format-date';

import './style.css';

function CommentItem({
   comment,
   onReply,
   activeCommentId,
   resetActiveComment,
   sessionExists,
   createComment,
   profileName,
   }) {
  const cn = bem('CommentItem');

  const style = {
    marginLeft: `${comment.level * 40}px`,
  };

  const showReplyForm = activeCommentId === comment._id;

  return (
    <div className={cn()} style={style}>
      <div className={cn('info')}>
        <div className={cn('user')}>
          {comment.author?.profile?.name || profileName}
        </div>
        <div className={cn('date')}>{formatDate(comment.dateCreate)}</div>
      </div>

      <div className={cn('text')}>{comment.text}</div>

      <button className={cn('button')} onClick={() => onReply(comment._id)}>
        Ответить
      </button>

      {showReplyForm && (
        sessionExists ? (
          <CommentNew
            status="reply"
            onSubmit={text => createComment(text, comment._id)}
            onCancel={resetActiveComment}
          />
        ) : (
          <CommentLogin />
        )
      )}
    </div>
  );
}

export default memo(CommentItem);
