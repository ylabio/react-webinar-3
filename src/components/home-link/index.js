import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../language-context';
import translations from '../../locales';
import PropTypes from 'prop-types';
import './style.css';
import useStore from '../../store/use-store';

function HomeLink({ resetPagination = false }) {
  const { language } = useLanguage();
  const t = translations[language];
  const store = useStore();

  const handleClick = () => {
    if (resetPagination) {
      store.actions.pagination.loadPage(1);
    }
  };

  return (
    <Link
      className="home-link"
      to="/"
      onClick={handleClick}
    >
      {t.home || (language === 'ru' ? 'Главная' : 'Home')}
    </Link>
  );
}

HomeLink.propTypes = {
    resetPagination: PropTypes.bool
  };

export default React.memo(HomeLink);
