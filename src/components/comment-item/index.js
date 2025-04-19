import React, { useCallback } from 'react';
import './style.css';
import formatDate from '../../utils/format-date';
import Button from '../button';
import Textarea from '../textarea';

const CommentItem = ({
  comment,
  activeReplyId = null,
  setActiveReplyId = _id => {},
  isAuth = false,
  postCommentText = '',
  setPostCommentText = () => {},
  onPost = () => {},
  sessionUserId = null,
  goToLogin = () => {},
  t = z => {},
  lang = 'ru',
}) => {

  const callbacks = {
    onReply: useCallback(() => {
      setActiveReplyId(comment._id);
      setPostCommentText('');
    }, []),
    onActiveReplyReset: useCallback(() => {
      setActiveReplyId(null);
      setPostCommentText('');
    }, []),
  };

  return (
    <>
      <div className="com-item">
        <div className="com-item-head">
          <div
            className={'com-item-head-name' + (sessionUserId === comment.author._id ? ' com-item-head-name_user' : '')}
          >
            {comment?.author?.profile?.name}
          </div>
          <div className="com-item-head-date">{formatDate(comment?.dateCreate, lang)}</div>
        </div>

        <div className="com-item-body">{comment?.text}</div>

        <Button style="text-com" onClick={callbacks.onReply} title={t('comments.reply')} />
      </div>

      <div className="com-item-children">
        {comment.replies.length > 0 && (
          <>
            {comment.replies.map(child => (
              <CommentItem
                key={child._id}
                comment={child}
                activeReplyId={activeReplyId}
                setActiveReplyId={setActiveReplyId}
                isAuth={isAuth}
                postCommentText={postCommentText}
                setPostCommentText={setPostCommentText}
                onPost={onPost}
                sessionUserId={sessionUserId}
                goToLogin={goToLogin}
                t={t}
                lang={lang}
              />
            ))}
          </>
        )}
        {activeReplyId === comment._id && isAuth && (
          <Textarea
            onCancel={callbacks.onActiveReplyReset}
            parentType="comment"
            title={t('comments.new-reply-title')}
            postCommentText={postCommentText}
            setPostCommentText={setPostCommentText}
            onPost={onPost}
            t={t}
          />
        )}
        {activeReplyId === comment._id && !isAuth && (
          <div className={'com-item-unAuth'}>
            <Button style={'text'} title={t('comments.unAuth-btn')} onClick={goToLogin} />
            {t('comments.unAuth-text')}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
