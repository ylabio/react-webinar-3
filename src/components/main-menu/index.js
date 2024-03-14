import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { memo, useContext } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { LanguageContext } from '../../languageContext';
import jsonText from './text.json'

function MainMenu({changePage}) {

    const [language, setLanguage] = useContext(LanguageContext);
  
    const cn = bem('MainMenu');
    const path = useMatch('/')
  
    const text = jsonText;
  
    return (
      <div className={cn()}>
        <Link className={cn('link')} to='/' onClick={path ? () => changePage(1) : () => {}}>{text[language].main}</Link>
      </div>
    );
  }
  
  MainMenu.propTypes = {
    changePage: PropTypes.func.isRequired
  };
  
  MainMenu.defaultProps = {
    changePage: () => {}
  }
  
  export default memo(MainMenu);