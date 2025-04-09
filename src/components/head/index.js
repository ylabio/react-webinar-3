import { memo } from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

import './style.css';

function Head({ title, onChangeLang, currentLang }) {
  const callbacks = {
    onSwitchLang: () => onChangeLang(),
  };

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <Button style="outline" onClick={callbacks.onSwitchLang} title={currentLang} />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  onChangeLang: PropTypes.func.isRequired,
  currentLang: PropTypes.string.isRequired,
};

export default memo(Head);
