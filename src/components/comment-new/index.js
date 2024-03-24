import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginMessage from '../login-message';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CommentNew = ({ session, onCreateNewComment, t }) => {
  const [text, setText] = useState('');
  const cn = bem('CommentNew');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateNewComment(text);
    setText('');
  };

  if (!session) {
    return (<LoginMessage t={t} />)
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
};


export default CommentNew;
