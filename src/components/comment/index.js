import { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment({ 
  comment, 
  offset, 
  replyOpen,
  authorized,
  onLogin,
  onOpenReply,
  onSendReply,
  onCloseReply, 
  labelReplyButton,
  labelNewReply,
  labelSendButton,
  labelCancelButton,
  labelLogin,
  labelLoginPrompt,
}) {

  const cn = bem('Comment');

  const getOffsetClass = (offset) => {
    return cn(`offset-${Math.min(offset - 1, 3)}`);
  }

  const renderReplyForm = useCallback(() => {
    if (authorized && replyOpen) {
      return <form>
        <label>{labelNewReply}</label>
        <textarea />
        <div className={cn('form-buttons')}>
          <button onClick={onSendReply}>{labelSendButton}</button>
          <button onClick={onCloseReply}>{labelCancelButton}</button>
        </div>      
      </form>
    };
    if (!authorized && replyOpen) {
      return <div>
        <button onClick={onLogin}>
          {labelLogin}
        </button>
        {labelLoginPrompt}
        <button onClick={onCloseReply}>
          {labelCancelButton}
        </button>
      </div>
    };
  }, [replyOpen, onOpenReply, onCloseReply, labelNewReply, labelSendButton, labelCancelButton])

  return comment && (
    <div className={`${cn()} ${getOffsetClass(offset)}`}>
      <div className={cn('heading')}>
        <span className={cn('username')}>{comment.author?.profile.name}</span>
        <span className={cn('date')}>{comment.dateCreate}</span>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <button onClick={onOpenReply} className={cn('reply-button')}>{labelReplyButton}</button>
      {renderReplyForm()}
    </div>    
  );
}

Comment.propTypes = {

};

Comment.defaultProps = {

}

export default memo(Comment);
