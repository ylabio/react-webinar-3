import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { useLanguage } from "../../store/language-context";

function Controls({onAdd}) {

  const {Language, translations} = useLanguage();

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{translations['buttonAdd']}</button>
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
