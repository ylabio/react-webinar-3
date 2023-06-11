import React, { useState } from "react";
import {cn as bem} from "@bem-react/classname";

import './style.css'
import useTranslate from "../../hooks/use-translate";
import NeedSign from "../need-sign";


function CommentForm({ text,
                       reff,
                       level,
                       exists,
                       onSignIn,
                       isReply,
                       onCancel,
                       send,
                       onChange
                     }) {
  const {t} = useTranslate();
  let title = isReply ? 'Новый ответ' : t('comment.newComment')
  const cn = bem('NewComment');
  const handleSubmit = (e) => {
    e.preventDefault();
    send();
  };


  return (
    <>
      {exists && <div className={cn()} ref={reff} style={{ paddingLeft: 30 * level + 'px' }}>
        <form className={cn('form')} onSubmit={handleSubmit}>
          <span className={cn('title')}>{title}</span>
          <textarea
            className={cn('textarea')}
            value={text}
            onChange={e => onChange(e.target.value)}
            rows={5}
          ></textarea>
          <div className={cn('buttonsBlock')}>
            <button className={cn('button')} type="submit">{t('comment.submit')}</button>
            {isReply &&
              <button className={cn('button')} onClick={onCancel}>{t('comment.cancel')}</button>
            }
          </div>
        </form>
      </div>}
      {!exists &&
        <NeedSign
          sign={onSignIn} action='комментировать'
          reff={reff} level={level}
          isReply={isReply}
          onCancel={onCancel}
        />}
    </>

  );

}

export default CommentForm;
