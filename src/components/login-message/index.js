import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

const LoginMessage = ({ onCancel, reply = false, t , onSignIn}) => {
  const cn = bem('LoginMessage')

  const onSignInCom = (e) => {
    e.preventDefault();
    onSignIn()
  }
  const onCancelForm = (e) => {
    e.preventDefault();
    onCancel()
  }

  return (
    <div className={cn()}>
      <a href='#' onClick={onSignInCom} className={cn('login')}>{t('comments.login')}</a>
      <span className={cn('text')}>, {t("comments.text")} {reply ? <>{t("comments.replySmall")}</> : <>{t("comments.commentOn")}</>}.
      </span>
      {' '}
      {reply && <a href='' className={cn('cancel')} onClick={onCancelForm}>{t("comments.cancel")}</a>}
    </div>
  );
};

LoginMessage.propTypes = {
  onCancel: PropTypes.func,
  reply: PropTypes.bool,
  t: PropTypes.func,
};

export default memo(LoginMessage);