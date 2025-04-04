import { memo } from 'react';
import PropTypes from 'prop-types';
import LanguageSwitcher from "../language-switcher";
import { useTranslation } from '../../hooks/useTranslation';
import './style.css';

function Head({ title }) {
  const { t } = useTranslation();
  
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{t(title)}</h1>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string.isRequired
};

export default memo(Head);
