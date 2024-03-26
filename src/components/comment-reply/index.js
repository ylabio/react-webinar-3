import React, { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoginMessage from '../login-message';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CommentReply = ({ session, onCancel, onAddReplyComment, t, onLogin, isReply }) => {
  const [text, setText] = useState('');
  const cn = bem('CommentReply');
  const formRef = useRef(null);
  
  useEffect(() => {   
    if (formRef.current && !isReply) {      
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });      
    }

    return () => {
      formRef.current = null;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText !== '') { 
      onAddReplyComment(trimmedText);
      setText('');
    }
  };

  if (!session) {
    return (<LoginMessage onCancel={onCancel} reply={!isReply} t={t} onLogin={onLogin} />)
  }

  return (
    <form ref={formRef} className={cn()} onSubmit={handleSubmit}>
      <h2 className={cn('title')}>{t('commentReply.newReply')}</h2>
      <textarea className={cn('text')} value={text} onChange={(e) => setText(e.target.value)} required />
      <div className={cn('wrapper')}>
        <button type='submit'>{t('submit')}</button>
        <button type='button' onClick={onCancel}>{t('cancel')}</button>
      </div>
    </form>
  );
};

CommentReply.propTypes = {
  session: PropTypes.bool,
  onCancel: PropTypes.func,
  onAddReplyComment: PropTypes.func,
  t: PropTypes.func,
  onLogin: PropTypes.func,
};

export default memo(CommentReply);
