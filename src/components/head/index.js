import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LanguageSwitcher from '../language-switcher';
import { useTranslation } from '../../store/language/use-translation';

function Head({ titleKey }) {

  const t = useTranslation();

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{t(titleKey)}</h1>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string,
};

export default memo(Head);
