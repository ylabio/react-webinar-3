import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LanguageSwitcher from '../../app/language-switcher';

function Head({ title }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
