import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

/**
 * Редактор комментария. Проп shift - для внешней настройки смещения. reff - ссылка на элемент для скролл-контроля
 */

function CommentEditor({ isAuth, isReply, text, onChange, onSubmit, onCancel, onSignin, shift, reff, t }) {
  const cn = bem('CommentEditor');

  return (
    <div className={cn()} style={{ paddingLeft: 30 * shift + 'px' }} ref={reff}>{
      isAuth ?
      <>
        <div className={cn('title')}>{isReply ? t("comments.newReplay") : t("comments.newComment")}</div>
        <textarea className={cn('textarea')} onChange={e => onChange(e.target.value)} value={text} />
        <div className={cn('actions')}>
          <button className={cn('button')} onClick={onSubmit} disabled={!text.length}>{t("comments.submit")}</button>
          {isReply ? <button className={cn('button')} onClick={onCancel}>{t("comments.cancel")}</button> : null}
        </div>
      </>
      :
      <div className={cn('actions')} >
        <div className={cn('loglink')} onClick={onSignin}>{t("comments.signin")}</div>
        <div className={cn('logmessage')}>{isReply ? t("comments.forReply") : t("comments.forComment")}.</div>
        {isReply ? <div className={cn('logcancel')} onClick={onCancel}>{t("comments.cancel")}</div> : null}
      </div>
    }</div>
  );
}

CommentEditor.propTypes = {
  isAuth: PropTypes.bool,
  isReply: PropTypes.bool,
  text: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onSignin: PropTypes.func,
  shift: PropTypes.number,
  reff: PropTypes.object,
  t: PropTypes.func
}

CommentEditor.defaultProps = {
  isAuth: false,
  isReply: false,
  text: '',
  onChange: () => { },
  onSubmit: () => { },
  onCancel: () => { },
  onSignin: () => { },
  shift: 0,
  reff: { },
  t: () => { }
}

export default React.memo(CommentEditor);