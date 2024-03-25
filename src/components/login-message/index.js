import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

const LoginMessage = ({ onCancel, reply = false, t }) => {
  const cn = bem('LoginMessage');

  return (
    <div className={cn()}>
      <Link to="/login" className={cn('login')}>{t('comments.login')}</Link>
      <span className={cn('text')}>,
        {t("comments.text")}
        {reply ? <>{t("comments.reply")}</> : <>{t("comments.commentOn")}</>}.
      </span>
      {' '}
      {reply && <button type='button' className={cn('button')} onClick={onCancel}>{t("comments.cancel")}</button>}
    </div>
  );
};

LoginMessage.propTypes = {
  onCancel: PropTypes.func,
  reply: PropTypes.bool,
  t: PropTypes.func,
};

export default memo(LoginMessage);