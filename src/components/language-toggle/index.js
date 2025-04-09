import { memo, useContext } from 'react';
import { cn as bem } from '@bem-react/classname';
import { LanguageContext } from '../../contexts/LanguageContext';
import './style.css';

function LanguageToggle() {
  const cn = bem('LanguageToggle');
  const { language, setLanguage } = useContext(LanguageContext);

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <select className={cn()} onChange={handleChange} value={language}>
      <option value="ru">ru</option>
      <option value="en">en</option>
    </select>
  );
}

export default memo(LanguageToggle);
