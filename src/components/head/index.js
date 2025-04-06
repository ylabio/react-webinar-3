import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, language, handleLanguageChange, translations }) {
  const cn = bem('Head');
  const listTransfers = translations[language];
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <h1>{title}</h1>
        <div className={cn('switcher')}>
          <span>{listTransfers.language}: </span>
          <button
            onClick={() => handleLanguageChange('ru')}
            className={language === 'ru' ? 'active' : ''}
          >
            {listTransfers.ru}
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className={language === 'en' ? 'active' : ''}
          >
            {listTransfers.en}
          </button>
        </div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  language: PropTypes.string.isRequired,
  handleLanguageChange: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
};

export default memo(Head);
