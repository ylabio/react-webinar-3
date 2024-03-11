import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { LanguageContext } from "../../languageContext";

function Controls({onAdd}) {

  const [language, setLanguage] = useContext(LanguageContext);

  const text = {
    ru: 'Добавить',
    eng: 'Add into basket'
  }

  return (
    <div className='Controls'>
      <button onClick={() => {onAdd(), console.log(language)}}>{text[language]}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
