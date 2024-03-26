import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginMessage from '../login-message';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CommentNew = ({ session, onCreateNewComment, t, onLogin }) => {
  const [text, setText] = useState('');
  const cn = bem('CommentNew');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText !== '') { 
      onCreateNewComment(trimmedText);
      setText('');
    }
  };

  if (!session) {
    return (<LoginMessage t={t} onLogin={onLogin} />)
  }  

  return (
    <form className={cn()} onSubmit={(e) => handleSubmit(e)}>
      <h2 className={cn('title')}>{t('commentNew.newComment')}</h2>
      <textarea className={cn('text')} value={text} onChange={(e) => setText(e.target.value)} required />
      <button className={cn('button')} type="submit">{t('submit')}</button>
    </form>
  );
};

CommentNew.propTypes = {
  session: PropTypes.bool,
  onCreateNewComment: PropTypes.func,
  t: PropTypes.func,
  onLogin: PropTypes.func,
};


export default CommentNew;
