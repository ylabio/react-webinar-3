import { memo, useCallback } from 'react';
import './style.css';
import Select from '../select';
import { useTranslation } from '../../i18n/language-context';

const options = [
  { value: 'en', text: 'English' },
  { value: 'ru', text: 'Русский' },
];

function LangSwitcher() {
  const { t, language, setLanguage } = useTranslation();

  const selectLangHandler = useCallback(e => {
    setLanguage(e.target.value);
  }, []);

  return (
    <div className="LangSwitcher">
      <div className="LangSwitcher-text">{t('SelectLanguage')}: </div>
      <Select value={language} options={options} onChange={selectLangHandler} />
    </div>
  );
}

export default memo(LangSwitcher);
