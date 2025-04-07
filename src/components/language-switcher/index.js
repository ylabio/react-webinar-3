import { useContext } from 'react';
import { LanguageContext } from '../../context/language-context';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LanguageSwitcher() {
  const cn = bem('LanguageSwitcher');
  const { language, setLanguage } = useContext(LanguageContext);

  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <select className={cn()} value={language} onChange={handleChange}>
      <option value="ru">Руc</option>
      <option value="en">En</option>
    </select>
  );
}

export default LanguageSwitcher;
