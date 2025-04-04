import PropTypes from 'prop-types';
import { useLanguage } from '../../store/language-context';
import Language from '../../assets/icon/language.svg';

import './style.css';

function LanguageChange() {
  const { language, changeLanguage } = useLanguage();
  return (
    <div className="language-change">
      <Language />
      <select value={language} onChange={e => changeLanguage(e.target.value)}>
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

export default LanguageChange;
