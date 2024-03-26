import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

const LoginMessage = ({ onCancel, reply, t, onLogin  }) => {
  const cn = bem('LoginMessage');  
  const loginMessageRef = useRef(null);

  useEffect(() => {    
    if (loginMessageRef.current && reply) {
      loginMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    return () => {
      loginMessageRef.current = null;
    };
  }, []);

  return (
    <div ref={loginMessageRef}  className={cn({ 'reply': reply })}>      
      <button type="button" className={cn('login')} onClick={onLogin}>
        {t('loginMessage.enter')}
      </button>
      <span className={cn('text')}>, 
        {t('loginMessage.comment')} 
        {reply ? t('loginMessage.comment.reply') : t('loginMessage.comment.comment')}.
      </span>
      {' '}
      {reply && <button type='button' className={cn('button')} onClick={onCancel}>{t('cancel')}</button>}
    </div>
  );
};

LoginMessage.propTypes = {
  onCancel: PropTypes.func,
  reply: PropTypes.bool,
  t: PropTypes.func,
};

export default memo(LoginMessage);