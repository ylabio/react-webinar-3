import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { LanguageContext } from "../../store/language";
import translations from '../../store/language/translations.json'

function Controls({onAdd}){

  const ln = useContext(LanguageContext).ln

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{translations[ln].addBtn}</button>
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
