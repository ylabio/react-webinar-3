import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

const LoginMessage = ({ onCancel, reply = false, t}) => {
  const cn = bem('LoginMessage');
  
  return (
    <div className={cn()}>
      <Link to="/login" className={cn('login')}>{t('loginMessage.enter')}</Link>
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