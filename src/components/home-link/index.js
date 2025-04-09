import { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../locales';
import './style.css';

function HomeLink() {
  const { language } = useContext(LanguageContext);
  return (
    <Link to={`/`} className="HomeLink">{translations[language].main}</Link>
  );
}

export default memo(HomeLink);
