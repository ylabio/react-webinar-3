import { memo, useCallback, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';
import ReplyForm from '../reply-form';

function Comment({
  comment,
  comments,
  level = 0,
  isLogin,
  loginComment,
  replyToCommentId,
  setReplyToCommentId,
  onSendReply,
}) {
  // const { article, onAdd = () => {}, t = text => text } = props;
  const cn = bem('Comment');
  const replyFormRef = useRef(null);

  if (comment.isDeleted) return null;

  const children = comments.filter(
    item => item.parent._id === comment._id && item.parent._type === 'comment' && !item.isDeleted,
  );

  const callbacks = {
    onReply: useCallback(() => {
      setReplyToCommentId(comment._id);
    }, [comment._id, setReplyToCommentId]),

    onReplyChancel: useCallback(() => {
      setReplyToCommentId(null);
    }, [setReplyToCommentId]),
  };

  useEffect(() => {
    if (replyToCommentId && replyFormRef.current) {
      const rect = replyFormRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const scrollToPosition = scrollY + rect.top - windowHeight + rect.height + 250;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
    }

  }, [replyToCommentId]);

  return (
    <div className={cn('wrapper', { nested: level > 0 && level < 10 })}>
      <div className={cn('content')}>
        <div className="">
          <span className={cn('name')}>{comment.author.profile.name} </span>
          <span className={cn('date')}>{new Date(comment.dateCreate).toLocaleString()}</span>
        </div>
        <p className={cn('text')}>{comment.text}</p>
        <Button style="comment" onClick={callbacks.onReply} title="Ответить" />
      </div>
      {children.map(child => (
        <Comment
          key={child._id}
          comment={child}
          comments={comments}
          level={level + 1}
          isLogin={isLogin}
          loginComment={loginComment}
          replyToCommentId={replyToCommentId}
          setReplyToCommentId={setReplyToCommentId}
          onSendReply={onSendReply}
        />
      ))}
      {replyToCommentId === comment._id && isLogin && (
        <ReplyForm
          title="Новый ответ"
          placeholder={`Мой ответ для ${comment.author.profile.name}`}
          onChancel={callbacks.onReplyChancel}
          onSendReply={onSendReply}
          type={'comment'}
          _id={replyToCommentId}
          replyFormRef={replyFormRef}
        />
      )}
      {replyToCommentId === comment._id && !isLogin && loginComment}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  level: PropTypes.number,
  isLogin: PropTypes.bool,
  loginComment: PropTypes.node,
  replyToCommentId: PropTypes.string,
  setReplyToCommentId: PropTypes.func,
  onSendReply: PropTypes.func,
};

export default memo(Comment);
