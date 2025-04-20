import { memo, useCallback, useState } from 'react';
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
        />
      )}
      {replyToCommentId === comment._id && !isLogin && loginComment}
    </div>
  );
}

// Comment.propTypes = {
//   article: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     description: PropTypes.string,
//     madeIn: PropTypes.object,
//     category: PropTypes.object,
//     edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     price: PropTypes.number,
//   }).isRequired,
//   onAdd: PropTypes.func,
//   t: PropTypes.func,
// };

export default memo(Comment);
