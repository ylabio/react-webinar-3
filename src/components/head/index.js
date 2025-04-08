import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LangSwitcher from "../lang-switcher";

function Head({ title }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <LangSwitcher />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
