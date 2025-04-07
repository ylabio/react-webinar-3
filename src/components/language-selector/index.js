import { memo } from 'react';
import './style.css';
import { useLanguage } from '../../store/use-language';


function LanguageSelector() {
  const { setNewLanguage } = useLanguage();
  return (
    <select className="LanguageSelector" onChange={(e) => setNewLanguage(e.target.value)}>
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </select>
  )
}

export default memo(LanguageSelector);