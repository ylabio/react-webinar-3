import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function LangSwitcher({ onLangChange, currentLanguage, languagesList }) {
  const cn = bem('LangSwitcher');

  return (
    <div className={cn()}>
      {languagesList.map((language) => (
        <button
          disabled={currentLanguage === language}
          type={'button'}
          className={cn('item')}
          onClick={() => onLangChange(language)}
          key={language}
        >
          {language}
        </button>
      ))}
    </div>
  );
}

LangSwitcher.propTypes = {
  onLangChange: PropTypes.func,
  currentLanguage: PropTypes.string,
  languagesList: PropTypes.arrayOf(PropTypes.string),
};

export default LangSwitcher;
