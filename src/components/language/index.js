import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';


function Language({language, languageRu = () => {}, languageEn = () => {}}) {

  return (
 <div className='Language'>
    <div 
        className={language === 'ru'  ? 'active' : ''} 
        onClick={languageRu}
    >{language === 'ru'  ? 'Русский' : 'Russian'}</div>
    <div 
        className={language === 'en'  ? 'active' : ''}
        onClick={languageEn}
    >{language === 'ru'  ? 'Английский' : 'English'}</div>
 </div>
  );
}

Language.propTypes = {
  language: PropTypes.string,
  languageRu: PropTypes.func,
  languageEn: PropTypes.func,
};




export default memo(Language);