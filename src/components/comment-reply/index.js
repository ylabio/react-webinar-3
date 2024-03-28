import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginMessage from '../login-message';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CommentReply = ({ session, onCancel, onAddReplyComment, t, scrollToBottom, onSignIn}) => {
  const [text, setText] = useState('');
  const cn = bem('CommentReply');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReplyComment(text);
    setText('');
    scrollToBottom();
    onCancel();
  };

  if (!session) {
    return (<LoginMessage onSignIn={onSignIn} onCancel={onCancel} reply={true} t={t}/>)
  }
  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h2 className={cn('title')}>{t("comments.newCom")}</h2>
      <textarea className={cn('text')} value={text} onChange={(e) => setText(e.target.value)} required />
      <div className={cn('wrapper')}>
        <button  type='submit' disabled={text.replaceAll(' ','').length <= 0}>{t('comments.toSend')}</button>
        <button type='button' onClick={onCancel}>{t("comments.cancel")}</button>
      </div>
    </form>
  );
};

CommentReply.propTypes = {
  session: PropTypes.bool,
  onCancel: PropTypes.func,
  onAddReplyComment: PropTypes.func,
  t: PropTypes.func,
};

export default CommentReply;