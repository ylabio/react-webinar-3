import {memo, useContext} from "react";
import LanguageSwitcher from '../language-switcher';
import { LanguageContext } from '../../language-provider';
import PropTypes from "prop-types";
import './style.css';

function Head({title}) {
  const { t } = useContext(LanguageContext); 
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
};

export default memo(Head);
