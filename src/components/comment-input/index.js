import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function CommentInput({ onSend, onCancel, parent, redirect, isLoggedIn, t }) {
  const cn = bem('CommentInput');
  const [text, setText] = useState('');

  const send = () => {
    onSend(text);
    setText('');
  }

  if (isLoggedIn) {
    return (
      <div id='CommentInput' className={cn()}>
        <div className={cn('head')}>
          {t("comments.new")} {parent == 'comment' ? t("comments.answer") : t("comments.comment")}
        </div>
        <div className={cn('body')}>
          <textarea className={cn('body-input')} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className={cn('actions')}>
          <button onClick={send}>{t("comments.send")}</button>
          {parent == 'comment' && <button onClick={() => onCancel()}>{t("comments.cancel")}</button>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('redirect')}>
      <Link to={redirect}>{t("comments.login")}</Link>
      , {t('comments.why')}.
      {parent == 'comment' && <div className={cn('redirect-cancel')} onClick={() => onCancel()}> {t("comments.cancel")}</div>}
    </div>
  );
}

CommentInput.propTypes = {
  onSend: PropTypes.func,
  onCancel: PropTypes.func,
  parent: PropTypes.string,
  redirect: PropTypes.string,
  isLoggedIn: PropTypes.boolean,
  t: PropTypes.func
}

export default memo(CommentInput);