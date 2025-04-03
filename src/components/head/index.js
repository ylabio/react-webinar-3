import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LanguageChanger from '../language-changer';

function Head({ title }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <LanguageChanger/>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
