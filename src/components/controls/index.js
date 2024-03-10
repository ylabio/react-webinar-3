import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {LanguageContext} from "../../language-provider.js";

function Controls({onAdd}) {

  const { language } = useContext(LanguageContext);

  const text = language === 'ru' ? 'Добавить' : 'Add';

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{text}</button>
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
