import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Language({onChange, lang}){
  const cn = bem('Language');

  return (
    <div className={cn()}>
      <label className={cn('label')}>
        RUS
        <input className={cn('radio')} type="radio" name="language" value="rus" checked={lang === 'rus'} onChange={onChange}></input>
      </label>
      <label className={cn('label')}>
        ENG
        <input className={cn('radio')} type="radio" name="language" value="eng" checked={lang === 'eng'} onChange={onChange}></input>
      </label>
    </div>
  );
}

Language.propTypes = {
  lang: PropTypes.oneOf(['rus', 'eng']),
};

Language.defaultProps = {
  lang: 'rus',
}

export default memo(Language);
