import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginMessage from '../login-message';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CommentReply = ({ session, onCancel, onAddReplyComment, t }) => {
  const [text, setText] = useState('');
  const cn = bem('CommentReply');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReplyComment(text);
    setText('');
  };

  if (!session) {
    return (<LoginMessage onCancel={onCancel} reply={true}/>)
  }

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h2 className={cn('title')}>Новый ответ </h2>
      <textarea className={cn('text')} value={text} onChange={(e) => setText(e.target.value)} required />
      <div className={cn('wrapper')}>
        <button type='submit'>Отправить</button>
        <button type='button' onClick={onCancel}>Отмена</button>
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