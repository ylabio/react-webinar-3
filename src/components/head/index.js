import { memo } from "react";
import LanguageSwitcher from '../language-switcher';
import PropTypes from "prop-types";
import './style.css';

function Head({ title, t }) {    
  const componentTitle = title === 'Магазин' ? t('store') : title;

  return (
    <div className='Head'>
      <h1>{componentTitle}</h1>
      <LanguageSwitcher />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  t: PropTypes.func
};

export default memo(Head);
