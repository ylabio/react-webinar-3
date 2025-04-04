import { memo } from 'react';
import './style.css';
import { useLanguage } from '../../i18n';

const LanguageControl = () => {
  const { language, setLanguage, translate } = useLanguage();

  const handleChange = e => {
    setLanguage(e.target.value);
  };

  return (
    <div className={'Language'}>
      <select id="Language-select" value={language} onChange={handleChange}>
        <option value="ru">ru</option>
        <option value="en">en</option>
      </select>
    </div>
  );
};

export default memo(LanguageControl);
