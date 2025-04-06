import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

function LanguageSwitcher({ lang = 'ru', onLanguageChange = () => {} }) {
  const cn = bem('LanguageSwitcher');

  const callbacks = {
    onLanguageChange: lang => onLanguageChange(lang),
  };

  return (
    <div className={cn()}>
      <button
        className={lang === 'ru' ? cn('active') : ''}
        onClick={() => callbacks.onLanguageChange('ru')}
      >
        RU
      </button>
      <button
        className={lang === 'en' ? cn('active') : ''}
        onClick={() => callbacks.onLanguageChange('en')}
      >
        EN
      </button>
    </div>
  );
}

LanguageSwitcher.propTypes = {
  lang: PropTypes.string,
  onLanguageChange: PropTypes.func,
};

export default memo(LanguageSwitcher);
