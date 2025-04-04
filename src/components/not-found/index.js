// NotFound.js
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import LanguageContext from '../language-provider';



function NotFound() {

  const { language, translations } = useContext(LanguageContext);

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>{translations[language].notFound}</p>
      <Link to="/" className="home-link">{translations[language].notFoundBtn}</Link>
    </div>
  );
}

export default NotFound;
