import { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function Head({ title, changeLanguage, switchLanguage }) {
  
  return (
    <header className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <Button
          style="primary"
          onClick={changeLanguage}
          title={switchLanguage}
        />
      </div>
    </header>
  );
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  switchLanguage: PropTypes.string.isRequired
};

export default memo(Head);
