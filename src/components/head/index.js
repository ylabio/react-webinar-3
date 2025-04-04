import { memo } from 'react';
import PropTypes from 'prop-types';
import LanguageChange from '../language-change';
import { useLanguage } from '../../store/language-context';
import './style.css';

function Head({ title }) {
  const { changeLanguage } = useLanguage;
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <LanguageChange onChange={changeLanguage} />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
