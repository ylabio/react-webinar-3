import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head({title, onChangeLanguage}){

  let language = {
    en: 'en',
    ru: 'ru'
  }; 

  const cn = bem('Head');
  
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <h1>{title}</h1>
      </div>
      <div className={cn('button')}>
        <button onClick={() => onChangeLanguage(language.en)}>EN</button>
        <button onClick={() => onChangeLanguage(language.ru)}>RU</button>
      </div>      
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onChangeLanguage: PropTypes.func
};

export default memo(Head);
