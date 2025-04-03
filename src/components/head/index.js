import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LangSwitcher from '../custom-lang-switcher';

function Head({ title }) {
  return (
    <header className="Header">
      <div className="Head-container">
        <h1>{title}</h1>
        <LangSwitcher />
      </div>
    </header>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
