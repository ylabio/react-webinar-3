import React, {useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css'
import useTranslate from "../../hooks/use-translate";

const NeedSign = ({sign, action, reff, level, isReply, onCancel}) => {
  const {t} = useTranslate();
  const cn = bem('NeedSign');
  return (
    <div className={cn()} ref={reff} style={{ paddingLeft: 30 * level + 'px' }}>
      <span className={cn('link')} onClick={sign}>Войдите</span>, чтобы иметь возможность {action}.
      {isReply && <span className={cn('cancel')} onClick={onCancel}>{t('comment.cancel')}</span>}
    </div>
  );
};

export default NeedSign;