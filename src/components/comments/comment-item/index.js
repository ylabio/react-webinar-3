import React, { memo, useRef, useEffect } from 'react';
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
  const showReplyForm = activeCommentId === comment._id;
  const formRef = useRef(null);

  // Скролл к форме ответа
  useEffect(() => {
    if (showReplyForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showReplyForm]);

  const level = comment.level ?? 0;
  const baseIndent = 40;  // Отступ для детей
  const commentIndent = level === 0 ? 2 : (level * baseIndent) + 2;  // У родителя отступ 2px

  return (
    <>
      <div className={cn()} style={{ marginLeft: `${commentIndent}px` }}>
        <div className={cn('info')}>
          <div
            className={cn('user', {
              authorized: comment.author?.profile?.name === profileName,
            })}
          >
            {comment.author?.profile?.name || profileName}
          </div>
          <div className={cn('date')}>{formatDate(comment.dateCreate)}</div>
        </div>

        <div className={cn('text')}>{comment.text}</div>

        <button className={cn('button')} onClick={() => onReply(comment._id)}>
          Ответить
        </button>
      </div>

      {/* Вложенные комментарии */}
      {comment.children?.map(child => (
        <CommentItem
          key={child._id}
          comment={child}
          onReply={onReply}
          activeCommentId={activeCommentId}
          resetActiveComment={resetActiveComment}
          sessionExists={sessionExists}
          createComment={createComment}
          profileName={profileName}
        />
      ))}

      {/* Форма ответа после всех потомков */}
      {showReplyForm && (
        <div ref={formRef} style={{ marginLeft: `${commentIndent + baseIndent}px` }}>
          {sessionExists ? (
            <CommentNew
              status="reply"
              onSubmit={text => createComment(text, comment._id)}
              onCancel={resetActiveComment}
            />
          ) : (
            <CommentLogin />
          )}
        </div>
      )}
    </>
  );
}

export default memo(CommentItem);
